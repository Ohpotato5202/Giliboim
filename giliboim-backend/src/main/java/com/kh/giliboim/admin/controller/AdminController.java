package com.kh.giliboim.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import com.kh.giliboim.community.model.vo.PostComment;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.giliboim.account.model.vo.Inquire;
import com.kh.giliboim.account.model.vo.Member;
import com.kh.giliboim.admin.model.service.AdminService;
import com.kh.giliboim.common.model.vo.PageInfo;
import com.kh.giliboim.common.template.Pagenation;
import com.kh.giliboim.community.model.vo.Post;
import com.kh.giliboim.community.model.vo.Report;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final AdminService service;

    // 회원 관리
    @GetMapping("/allAccount")
    public Map<String, Object> allAccount(
            @RequestParam(value = "pageNo", defaultValue = "1") int pageNo) {
        int listCount = service.selectAccountCount();
        PageInfo pi = Pagenation.getPageInfo(listCount, pageNo, 6, 13);
        List<Member> AccountList = service.allAccount(pi);

        Map<String, Object> map = new HashMap<>();
        map.put("AccountList", AccountList);
        map.put("pi", pi);

        return map;
    }

    @GetMapping("/account/{memberNo}")
    public Member selectAccount(@PathVariable int memberNo) {
        return service.selectAccount(memberNo);
    }

    @PostMapping("/account")
    public void updateAccount(@RequestBody Member member) {
        service.updateAccount(member);
    }

    @PatchMapping("/account/{memberNo}/suspend")
    public void suspendAccount(@PathVariable int memberNo) {
        service.suspendAccount(memberNo);
    }

    @DeleteMapping("/account/{memberNo}")
    public void deleteAccount(@PathVariable int memberNo) {
        service.deleteAccount(memberNo);
    }

    @PatchMapping("/account/{memberNo}/toggleStatus")
    public void toggleMemberStatus(@PathVariable int memberNo) {
        service.toggleMemberStatus(memberNo);
    }

    // 문의 관리
    @GetMapping("/inquiries")
    public Map<String, Object> getInquiries(
            @RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
            @RequestParam(name = "category", required = false) String category) {
    	
        int listCount = service.selectInquiriesCount(category);
        PageInfo pi = Pagenation.getPageInfo(listCount, pageNo, 6, 13);
        List<Inquire> inquireList = service.getInquiries(pi,category);

        Map<String, Object> map = new HashMap<>();
        map.put("inquireList", inquireList);
        map.put("pi", pi);

        return map;
    }
    
    @DeleteMapping("/inquiry/{inquireNo}")
    public void deleteInquiry(@PathVariable int inquireNo) {
        service.deleteInquiry(inquireNo);
    }

    @GetMapping("/inquiry/{inquireNo}")
    public Inquire getInquiry(@PathVariable int inquireNo) {
        log.info("inquire {}", service.getInquiryById(inquireNo));
        return service.getInquiryById(inquireNo);
    }

    @PostMapping("/inquiry/{inquireNo}/reply")
    public void submitReply(@PathVariable int inquireNo, @RequestBody Map<String, String> request) {
        String reply = request.get("reply");
        Map<String, Object> param = new HashMap<>();
        param.put("inquireNo", inquireNo);
        param.put("reply", reply);
        service.saveReply(param);
    }

 	// 게시물 관리
    @GetMapping("/posts")
    public Map<String, Object> getAllPosts(
    		@RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name="memberNo", required=false) Integer memberNo) {
    	
    	log.debug("memberNo {}", memberNo);
    	int listCount = service.selectPostCount(category, memberNo); // 게시물 총 개수 조회
        PageInfo pi = Pagenation.getPageInfo(listCount, pageNo, 6, 13); // 페이지네이션 정보 설정
        List<Post> postList = service.getAllPosts(pi, category, memberNo) ; // 페이지네이션 정보를 이용해 게시물 목록 조회

        Map<String, Object> map = new HashMap<>();
        map.put("postList", postList);
        map.put("pi", pi);

        return map;
    }

    @DeleteMapping("/post/{postNo}")
    public ResponseEntity<Void> deletePost(@PathVariable int postNo) {
        service.deletePost(postNo);
        return ResponseEntity.noContent().build();
    }

    // 게시물 신고 관리
    @GetMapping("/reports/{postNo}")
    public Map<String, Object> getAllReports(
    		@PathVariable int postNo
    		) {
        List<Report> reportList = service.getAllReports(postNo);
        Map<String, Object> map = new HashMap<>();
        map.put("reportList", reportList);
        return map;
    }

    @DeleteMapping("/report/{reportNo}")
    public ResponseEntity<Void> deletePostDetail(@PathVariable int reportNo) {
        service.deletePostDetail(reportNo);
        return ResponseEntity.noContent().build();
    }
    
    // 게시물 상세 관리
    @GetMapping("/post/{postNo}")
    public ResponseEntity<Post> getPostDetail(@PathVariable int postNo) {
    	Post post = service.getPostDetail(postNo);
    	return ResponseEntity.ok(post);
    }
    
    
    // 댓글 관리
    @GetMapping("/comments")
    public Map<String, Object> getAllComments(
    		@RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
    		@RequestParam(name = "category", required = false) String category,
    		@RequestParam(name="memberNo", required=false) Integer memberNo) {
    	
    	int listCount = service.selectCommentCount(category,memberNo); // 게시물 총 개수 조회
    	log.info("1238654315843={}",listCount);
    	PageInfo pi = Pagenation.getPageInfo(listCount, pageNo, 6, 13); // 페이지네이션 정보 설정
    	List<PostComment> commentList = service.getAllComments(pi,category,memberNo); // 페이지네이션 정보를 이용해 게시물 목록 조회
    	
    	log.info("asjdfkljkalsdf={}",commentList);
    	Map<String, Object> map = new HashMap<>();
    	map.put("commentList", commentList);
    	map.put("pi", pi);
    	
    	return map;
    }
    
    // 댓글 상세 관리
    @GetMapping("/comments/{commentNo}")
    public ResponseEntity<PostComment> getCommentDetail(@PathVariable int commentNo) {
    	PostComment comment = service.getCommentDetail(commentNo);
    	return ResponseEntity.ok(comment);
    }
    
    @DeleteMapping("/comment/{commentNo}")
    public ResponseEntity<Void> deleteComment(@PathVariable int commentNo) {
        service.deleteComment(commentNo);
        return ResponseEntity.noContent().build();
    }
    
    // 댓글 신고 관리
    @GetMapping("/comment/{commentNo}")
    public Map<String, Object> getAllCommentReports(@PathVariable int commentNo) {
        List<Report> reportList = service.getAllCommentReports(commentNo);
        Map<String, Object> map = new HashMap<>();
        map.put("reportList", reportList);
        return map;
    }

    @DeleteMapping("/comment/{reportNo}")
    public ResponseEntity<Void> deleteCommentDetail(@PathVariable int reportNo) {
    	service.deleteCommentDetail(reportNo);
        return ResponseEntity.noContent().build();
    }
    

}
