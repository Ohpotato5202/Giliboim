package com.kh.giliboim.admin.model.dao;

import java.util.List;
import java.util.Map;

import com.kh.giliboim.account.model.vo.Inquire;
import com.kh.giliboim.account.model.vo.Member;
import com.kh.giliboim.common.model.vo.PageInfo;
import com.kh.giliboim.community.model.vo.Post;
import com.kh.giliboim.community.model.vo.Report;
import com.kh.giliboim.community.model.vo.PostComment;

public interface AdminDao {
    // 회원 관리
    List<Member> allAccount(PageInfo pi);
    Member selectAccount(int memberNo);
    void updateAccount(Member member);
    void suspendAccount(int memberNo);
    void deleteAccount(int memberNo);
    
    // 문의 관리
    List<Inquire> getInquiries(PageInfo pi,String category);
    void deleteInquiry(int inquireNo);
    Inquire getInquiryById(int inquireNo);
    void saveReply(Map<String, Object> param);
    
    // 회원 상태 관리
    void toggleMemberStatus(int memberNo);
	int selectInquiriesCount(String category);
	int selectAccountCount();

    // 게시물 관리
	List<Post> getAllPosts(PageInfo pi,String category, Integer memberNo);
	int selectPostCount(String category, Integer memberNo);
    void deletePost(int postNo);  // 게시물 삭제

    // 게시물 신고 관리
    List<Report> getAllReports(int postNo);
    void deletePostDetail(int reportNo);  // 신고 삭제
    
    // 게시물 상세 관리
    Post getPostDetail(int postNo);
    List<Report> selectReportsByPostNo(int postNo);
    
    // 댓글 관리
    int selectCommentCount(String category, Integer memberNo);
    List<PostComment> getAllComments(PageInfo pi, String category, Integer memberNo);
    
    // 댓글 상세 관리
    PostComment getCommentDetail(int commentNo);
    void deleteComment(int commentNo);
    
    // 댓글 신고 관리
    List<Report> selectAllReportsByCommentNo(int commentNo);
    void deleteCommentDetail(int reportNo);
    
}
