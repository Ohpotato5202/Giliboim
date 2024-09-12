package com.kh.giliboim.community.model.service;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kh.giliboim.common.Utils;
import com.kh.giliboim.common.model.vo.PageInfo;
import com.kh.giliboim.community.model.dao.CommunityDao;
import com.kh.giliboim.community.model.vo.Post;
import com.kh.giliboim.community.model.vo.PostComment;
import com.kh.giliboim.community.model.vo.PostExt;
import com.kh.giliboim.community.model.vo.PostImg;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service 
@Slf4j 
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService {
	
	
	@Value("${file.upload-dir}")
	private String uploadDir;

	
	private final CommunityDao dao;
		
	@Override
	public int selectListCount() {
		return dao.selectListCount();
	}

	@Override
	public List<Post> selectList(PageInfo pi) {
		return dao.selectList(pi);
	}
	
	
	@Override
	public Post getPostDetail(int postNo) {
		return dao.getPostDetail(postNo);
	}

	@Override
	public List<PostComment> getCommentsByPostNo(int postNo) {
		return dao.getCommentsByPostNo(postNo);
	}

	@Override
	public int addComment(PostComment comment) {
		return dao.addComment(comment);
	}

	@Override
	public int incrementLikeCount(Map<String, Object> map) {
		return dao.incrementLikeCount(map);
	}

	@Override
	public int setAddCount(Map<String, Object> map) {
		return dao.setAddCount(map);
	}

	@Override
	public int getLikeCount(int postNo) {
		return dao.getLikeCount(postNo);
	}

	@Override
	@Transactional(rollbackFor = {Exception.class})
	public int insertPost(Post post, List<PostImg> piArr) throws Exception {
		
		// 0) 게시글 삽입전, XSS 파싱처리, 개행처리 수행 
		String title = post.getTitle();
		String content = post.getContent(); 
		title = Utils.XSSHandling(title);
		content = Utils.XSSHandling(content);
		content = Utils.newLineHandler(content);
		
		post.setTitle(title);
		post.setContent(content);
		
		// 1) INSERT POST 후 
		int result = dao.insertPost(post);
		
		// 2) INSERT POST_IMG 를 piArr 반복해서 등록하기(null인 값은 등록되지 않게 막는다.) 
		int pno = post.getPostNo(); 
		for(PostImg pi : piArr) {
			// null 일수도 있다. 
			if(pi != null) {
				pi.setPostNo(pno);
				result *= dao.insertPostImg(pi);
				// 곱셈 연산으로 데이터 연산이 잘 이뤄지는지 확인한다. 
			}
		}
		
		if(result == 0 ) {
			throw new Exception("예외 발생");
		}
		
		// 처리 결과 값 반환 
		return result;
	}

	@Override
	@Transactional(rollbackFor = {Exception.class})
	public int reportPost(Map<String, Object> params) throws Exception {
	    int result = dao.reportPost(params);
	    if (result == 0) {
	        throw new Exception("신고 처리에 실패했습니다.");
	    }
	    return result;
	}

	@Override
	public int deletePost(Map<String, Object> param) {
		
		return dao.deletePost(param);
	}

	@Override
	public int deleteComment(Map<String, Object> param) {
		
		return dao.deleteComment(param);
	}
	
	@Transactional(rollbackFor = {Exception.class})
	@Override
	public int updatePost(Map<String, Object> param) throws RuntimeException{
		
		// 원래 사진이 없고, 추가된 것도 없는 경우 -> 아무것도 안한다. 
		PostExt post = (PostExt) param.get("post");
		List<PostImg> postImgs = post.getPostImgs();
		MultipartFile[] files = (MultipartFile[]) param.get("files"); 
	
		
		// 1) POST 테이블 업데이트 
		int result = dao.updatePost(post);
		
		// 2) POST_IMG 테이블에 INSERT, UPDATE, DELETE 작업 수행 
		if(result == 0) {
			throw new RuntimeException("수정실패"); // 오류 발생으로 트랜잭션 rollback 
		}
		
		
		// 3) 이미지 처리
		
		// 절대 경로로 변환
		// "src/main/resources/static/images/" + "posts" 경로로 저장
		String absolutePath = Paths.get(uploadDir + "posts").toAbsolutePath().toString().toString();
		
		// 이미지들이 추가가 되었을때
		if(files != null) {
		  
		  // 3-1) 기존 이미지가 없고 새로운 이미지를 추가하는 경우 
		  if(postImgs.isEmpty()) {
			for(MultipartFile file : files) {
				PostImg pi = new PostImg();
				pi.setPostNo(post.getPostNo());
				
				String changeName = Utils.saveFile(file, absolutePath);
				pi.setChangeName(changeName);
				pi.setOriginalName(file.getOriginalFilename());
				
				result *= dao.insertPostImg(pi);	
			}  
		  }
		  // 3-2) 기존 이미지가 있을때 (삭제/업데이트/추가)
		  else {	
			  // 3-2-1) 기존 이미지 삭제 처리 
			  List<Integer> imageNoToDelete = new ArrayList<>();
			  for(PostImg img : postImgs) {
				  imageNoToDelete.add(img.getImageNo());
			  }
			  
			  result *= dao.deletePostImg(imageNoToDelete);
			  
			  // 3-2-2) 삭제 처리이후 다시 데이터 추가
			  for(MultipartFile file : files) {
					PostImg pi = new PostImg();
					pi.setPostNo(post.getPostNo());
					
					String changeName = Utils.saveFile(file, absolutePath);
					pi.setChangeName(changeName);
					pi.setOriginalName(file.getOriginalFilename());
					
					result *= dao.insertPostImg(pi);	
			  } 
			  /* 계속해서 이미지가 추가되는 작업이 있기 때문에 */
			  /* 스케쥴링을 통해서 삭제 시킬 수 있도록 한다.*/
		   }
		}
		
		else {
			// 3-2-1) 기존 이미지 삭제 처리 
			List<Integer> imageNoToDelete = new ArrayList<>();
			for(PostImg img : postImgs) {
			   imageNoToDelete.add(img.getImageNo());
			}
			if(imageNoToDelete.size() > 0) { 
				result *= dao.deletePostImg(imageNoToDelete);
			}
		}
		return result;
	}

	@Override
	public int updateComment(Map<String, Object> param) {
		
		return dao.updateComment(param);
	}

}





