package com.kh.giliboim.admin.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.giliboim.account.model.vo.Inquire;
import com.kh.giliboim.account.model.vo.Member;
import com.kh.giliboim.admin.model.dao.AdminDao;
import com.kh.giliboim.common.model.vo.PageInfo;
import com.kh.giliboim.community.model.vo.Post;
import com.kh.giliboim.community.model.vo.PostComment;
import com.kh.giliboim.community.model.vo.Report;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminServiceImpl implements AdminService {

    private final AdminDao adminDao;

    // 회원 관리 구현
    @Override
    public List<Member> allAccount(PageInfo pi) {
        return adminDao.allAccount(pi);
    }

    @Override
    public Member selectAccount(int memberNo) {
        return adminDao.selectAccount(memberNo);
    }

    @Override
    public void updateAccount(Member member) {
        adminDao.updateAccount(member);
    }

    @Override
    public void suspendAccount(int memberNo) {
        adminDao.suspendAccount(memberNo);
    }

    @Override
    public void deleteAccount(int memberNo) {
        adminDao.deleteAccount(memberNo);
    }

    // 문의 관리 구현
    @Override
    public List<Inquire> getInquiries(PageInfo pi,String category) {
        return adminDao.getInquiries(pi,category);
    }

    @Override
    public void deleteInquiry(int inquireNo) {
        adminDao.deleteInquiry(inquireNo);
    }

    @Override
    public Inquire getInquiryById(int inquireNo) {
        return adminDao.getInquiryById(inquireNo);
    }

    @Override
    public void saveReply(Map<String, Object> param) {
        adminDao.saveReply(param);
    }

    // 회원 상태 관리 구현
    @Override
    public void toggleMemberStatus(int memberNo) {
        adminDao.toggleMemberStatus(memberNo);
    }

	@Override
	public int selectInquiriesCount(String category) {
		return adminDao.selectInquiriesCount(category);
	}

	@Override
	public int selectAccountCount() {
		return adminDao.selectAccountCount();
	}

    // 게시물 관리 구현

    @Override
    public List<Post> getAllPosts(PageInfo pi,String category,Integer memberNo) {
        return adminDao.getAllPosts(pi,category,memberNo);
    }

    @Override
    public int selectPostCount(String category, Integer memberNo) {
        return adminDao.selectPostCount(category,memberNo);
    }

    @Override
    public void deletePost(int postNo) {
        adminDao.deletePost(postNo);
    }

    // 게시물 신고 관리

    @Override
    public List<Report> getAllReports(int postNo) {
        return adminDao.getAllReports(postNo);
    }

    @Override
    public void deletePostDetail(int reportNo) {
        adminDao.deletePostDetail(reportNo);
    }
    
    // 게시물 상세 관리
    @Override
    public Post getPostDetail(int postNo) {
        return adminDao.getPostDetail(postNo);
    }
    
    @Override
    public List<Report> getReportsByPostNo(int postNo) {
        return adminDao.selectReportsByPostNo(postNo);
    }
    
    
    // 댓글 관리
	@Override
	public int selectCommentCount(String category, Integer memberNo) {
		return adminDao.selectCommentCount(category,memberNo);
	}

	@Override
	public List<PostComment> getAllComments(PageInfo pi, String category, Integer memberNo) {
		return adminDao.getAllComments(pi,category,memberNo);
	}
	
	// 댓글 상세 관리
	@Override
    public PostComment getCommentDetail(int commentNo) {
        return adminDao.getCommentDetail(commentNo);
    }

    @Override
    public void deleteComment(int commentNo) {
        adminDao.deleteComment(commentNo);
    }
    
    // 댓글 신고 관리
    @Override
    public List<Report> getAllCommentReports(int commentNo) {
        return adminDao.selectAllReportsByCommentNo(commentNo);
    }

    @Override
    public void deleteCommentDetail(int reportNo) {
        adminDao.deleteCommentDetail(reportNo);
    }
}
