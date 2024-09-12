package com.kh.giliboim.community.controller;

import java.io.File;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.kh.giliboim.common.Utils;
import com.kh.giliboim.common.model.vo.PageInfo;
import com.kh.giliboim.common.template.Pagenation;
import com.kh.giliboim.community.model.service.CommunityService;
import com.kh.giliboim.community.model.vo.Post;
import com.kh.giliboim.community.model.vo.PostComment;
import com.kh.giliboim.community.model.vo.PostExt;
import com.kh.giliboim.community.model.vo.PostImg;
import com.kh.giliboim.jwt.JwtProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/community")
@RequiredArgsConstructor
@RestController
public class CommunityController {

	@Value("${file.upload-dir}")
	private String uploadDir;

	private final CommunityService service;
	private final JwtProvider provider;

	// 위험지역제보(커뮤) 목록 조회
	@GetMapping("/list")
	public Map<String, Object> community(
			@RequestParam(value="pageNo", defaultValue="1") int pageNo) {
		// 페이징 작업 처리 
		// 1) 게시글 갯수 카운팅 
		int listCount = service.selectListCount();
		log.debug("listCount {}", listCount );
		int pageLimit = 5; // 페이지에서 보여지는 페이지 개수
		int postLimit = 6; // 게시글 갯수 
		
		PageInfo pi = Pagenation.getPageInfo(listCount, pageNo , pageLimit, postLimit);
		
		// 2) 게시글 데이터 조회
		
		List<Post> communityList = service.selectList(pi);
		for(Post p : communityList) {
			p.setContent(Utils.newLineClear(p.getContent())); // 개행처리한거 변경
		}
		
		Map<String, Object> map = new HashMap<>();
		map.put("communityList", communityList);
		map.put("pi", pi);
		
		return map;
	}

	// 게시글 작성
	@PostMapping("/submit")
	public Map<String, Object> insertPost
			(
			@RequestPart("post") Post post,
			@RequestPart(value = "files", required = false) MultipartFile[] files,
			HttpServletRequest request
			) {
		
		String token = provider.resolveToken(request);
		
		int memberNo = provider.getTokenMemberNo(token);
		log.debug("memberNo {}", memberNo);
		
		
		System.out.println(uploadDir);
		Map<String, Object> map = new HashMap<>();

		// 토큰 정보를 바탕으로 가져온 memberNo로 게시글 저장
		post.setMemberNo(memberNo);

		// 업무로직
		PostImg pi = null;
		List<PostImg> piArr = new ArrayList<>();

		// 절대 경로로 변환
		// "src/main/resources/static/images/" + "posts" 경로로 저장
		String absolutePath = Paths.get(uploadDir + "posts").toAbsolutePath().toString().toString();

		// 1) 웹 서버에 클라이언트가 전달한 FILE 저장 (전달한 파일이 있다면)
		// "files" 가 null이 아닐때 파일을 저장한다.
		if (files != null) {
			for (MultipartFile file : files) {

				if (file != null && !file.getOriginalFilename().equals("")) {

					log.info("파일 저장");
					// 디렉토리가 존재하지 않으면 생성하는 코드 추가
					File dir = new File(absolutePath);
					if (!dir.exists()) {
						dir.mkdirs();
					}

					// 사용자가 등록한 첨부파일의 이름을 수정
					String changeName = Utils.saveFile(file, absolutePath);

					// 등록되는 첨부파일들을 리스트에 추가해서 넘겨주도록 한다.
					pi = new PostImg();
					pi.setChangeName(changeName);
					pi.setOriginalName(file.getOriginalFilename());
					piArr.add(pi);
				}
			}
		}

		// 2) 저장 완료시 파일이 저장된 경로를 POST_IMG에 등록후 테이블에 추가
		// -> 1) POST INSERT
		// -> 2) POST_IMG INSERT -> 클라이언트가 첨부파일을 보냈을때만

		int result = 0;
		try {
			result = service.insertPost(post, piArr);
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 3) map으로 저장하는거 확인
		if (result > 0) {
			map.put("msg", "게시글 등록에 성공했습니다!");
		} else {
			map.put("msg", "게시글 등록에 실패했습니다.");
		}

		return map;
	}

	// 게시글 상세조회페이지
	@GetMapping("/detail/{postNo}")
	public Post getPostDetail(@PathVariable int postNo) {
		Post postDetail = service.getPostDetail(postNo);
		
		postDetail.setContent(Utils.newLineClear(postDetail.getContent()));
		
		log.info("Post detail: {}", postDetail);
		return postDetail;
	}
		
	
	// 게시글 수정
	@PutMapping("/update/{postNo}")
	public Map<String, Object> updatePost(@PathVariable int postNo, 
			@RequestPart("post") PostExt post,
			@RequestPart(value = "files", required = false) MultipartFile[] files,
			HttpServletRequest request){
		
		String token = provider.resolveToken(request);
		
		int memberNo = provider.getTokenMemberNo(token);
		
		// 토큰 정보를 바탕으로 가져온 memberNo로 게시글 수정
		post.setMemberNo(memberNo);
		
		Map<String, Object> param = new HashMap<>();
		param.put("post", post);
		param.put("files", files);
		
		int result = service.updatePost(param);
		
		Map<String, Object> map = new HashMap<>();
		
		if(result > 0) {
			map.put("msg","게시글 수정을 완료했습니다.");
		} else {
			map.put("msg","게시글 수정을 실패했습니다.");
		}
		
		return map;
		
	}
	
	
	// 게시글 상세 조회 페이지 좋아요 갯수 DB에 저장하기
	@PostMapping("/like/{postNo}")
	public Map<String, Object> likePost(@PathVariable int postNo, HttpServletRequest request) {
		
		String token = provider.resolveToken(request);
		
		int memberNo = provider.getTokenMemberNo(token);
		log.debug("memberNo {}", memberNo);
		
		
		Map<String, Object> map = new HashMap<>();
		map.put("postNo", postNo);
		map.put("memberNo", memberNo);
		log.debug("map {}", map);
		
		// 유저 좋아요 눌렀는지 확인
		// select * from post_good where member_no = #{userNo} , post_no = #{postNo} (중복 좋아요 처리)
		int result = service.incrementLikeCount(map);
		
		Map<String, Object> response = new HashMap<>();
		
		// 좋아요를 누른 게시글의 정보를 확인하기
		if (result > 0) {
			// 게시글의 현재 좋아요 수 가져오기 select - count 행의 갯수 가져오기
			int likeCount = service.getLikeCount(postNo);
			response.put("msg", "이미 추천 하신 게시글 입니다.");
			response.put("likeCount", likeCount);
		} else {
			
			// 좋아요 증가시키고 DB에 넣기 insert post_no, member_no
			int addCount = service.setAddCount(map);
			
			// 게시글의 현재 좋아요 수 가져오기 select - count 행의 갯수 가져오기
			int likeCount = service.getLikeCount(postNo);
			response.put("likeCount", likeCount);
			response.put("msg", "추천이 반영되었습니다.");
		}
		return response;
	}
	
	
	// 게시글 삭제
	@DeleteMapping("/delete/{postNo}")
	public Map<String, Object> deletePost(@PathVariable int postNo, HttpServletRequest request){
		
		String token = provider.resolveToken(request);
		
		int memberNo = provider.getTokenMemberNo(token);
		log.debug("memberNo {}", memberNo);
		
		Map<String, Object> param = new HashMap<>();
		param.put("memberNo", memberNo );
		param.put("postNo", postNo);
		
		int result = service.deletePost(param);
		
		// 게시글 삭제가 완료 되었을때 
		Map<String, Object> map = new HashMap<>();
		
		if(result > 0) {
			map.put("msg", "삭제에 성공했습니다");
		}
		// 게시글 삭제를 실패 했을때
		else {
			map.put("msg", "삭제에 실패했습니다.");
		}
		
		return map;
		
	}
	
	
	

	// 특정 게시글에 대한 댓글 목록 가져오기
	@GetMapping("/detail/{postNo}/comments")
	public List<PostComment> communityDetail(@PathVariable int postNo) {

		List<PostComment> comments = service.getCommentsByPostNo(postNo);
		log.info("Comments {}", comments);
		return comments;
	}

	// 댓글 추가
	@PostMapping("/detail/{postNo}/comment")
	public Map<String, Object> addComment(
			@PathVariable int postNo, 
			@RequestBody PostComment comment,
			HttpServletRequest request) {
		
		String token = provider.resolveToken(request);
		
		int memberNo = provider.getTokenMemberNo(token);
		log.debug("memberNo {}", memberNo);
		
		
		comment.setMemberNo(memberNo);
		comment.setPostNo(postNo);
		log.debug("comment {}", comment);
		
		// 서비스 레이어를 통해 댓글 저장 로직 호출
		int result = service.addComment(comment);
		
		Map<String, Object> map = new HashMap<>();
		
		List<PostComment> comments = service.getCommentsByPostNo(postNo);
		
		map.put("comments", comments); //댓글을 등록하거나 성공하거나 동일하게 댓글 목록을 다시 가져오도록 하자
		
		if (result > 0) {
			map.put("msg", "댓글등록 성공");
		} else {
			map.put("msg", "댓글등록 성공");
		}

		return map;
	}
	
	// 댓글 삭제
	@DeleteMapping("/delete/comment/{pcNo}/{postNo}")
	public Map<String, Object> deleteComment(
			@PathVariable int pcNo,
			@PathVariable int postNo,
			HttpServletRequest request) {
		
		String token = provider.resolveToken(request);
		
		int memberNo = provider.getTokenMemberNo(token);
		log.debug("memberNo {}", memberNo);
		
		Map<String, Object> param = new HashMap<>();
		
		param.put("memberNo", memberNo);
		param.put("pcNo", pcNo);
		
		int result = service.deleteComment(param);
		
		Map<String, Object> map = new HashMap<>();
		
		List<PostComment> comments = service.getCommentsByPostNo(postNo);
		
		// 댓글 삭제요청에 대해 전체 댓글내용 다시 조회해서 추가 
		map.put("comments", comments);
		
		// 댓글 삭제에 성공시에 
		if(result >0) {
			map.put("msg", "댓글 삭제에 성공했습니다.");
			
		} 
		// 댓글 삭제에 실패시에
		else { 
			map.put("msg", "댓글 삭제에 실패했습니다.");
		}
		
		return map;
	}
	
	
	// 댓글 수정 
	@PutMapping("/update/comment/{pcNo}/{postNo}")
	public Map<String, Object> updateComment (
			@PathVariable int pcNo,
			@PathVariable int postNo,
			@RequestBody Map<String, Object> comment,
			HttpServletRequest request){
		
		log.debug("comment {}", comment);
		String token = provider.resolveToken(request);
		
		int memberNo = provider.getTokenMemberNo(token);
		log.debug("memberNo {}", memberNo);
		
		
		String content = (String)comment.get("editedComment");
		
		Map<String, Object> param = new HashMap<>();
		
		param.put("memberNo", memberNo);
		param.put("postNo", postNo);
		param.put("pcNo", pcNo);
		param.put("content", content);
		
		
		int result = service.updateComment(param);
		
		Map<String, Object> map = new HashMap<>();
		
		List<PostComment> comments = service.getCommentsByPostNo(postNo);
		
		// 댓글 삭제요청에 대해 전체 댓글내용 다시 조회해서 추가 
		map.put("comments", comments);
		
		// 댓글 삭제에 성공시에 
		if(result >0) {
			map.put("msg", "댓글 수정에 성공했습니다.");
			
		} 
		// 댓글 삭제에 실패시에
		else { 
			map.put("msg", "댓글 수정에 실패했습니다.");
		}
		
		return map;
	}
	
	
    // 신고 페이지
    @PostMapping("/complain")
    public ResponseEntity<Map<String, Object>> reportPost
    	(@RequestBody Map<String, Object> reportData, HttpServletRequest request) 
    {
		String token = provider.resolveToken(request);
		int memberNo = provider.getTokenMemberNo(token);
		
		reportData.put("memberNo", memberNo);
		
	    Map<String, Object> response = new HashMap<>();
        
        try {

            int result = service.reportPost(reportData);
            if (result > 0) {
                response.put("msg", "신고가 성공적으로 접수되었습니다.");
            } else {
                response.put("msg", "신고 접수에 실패했습니다.");
            }
        } catch (Exception e) {
            response.put("msg", "예외 발생: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
    
    
       
}
