package com.kh.giliboim.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.giliboim.account.model.vo.Inquire;
import com.kh.giliboim.account.model.vo.Member;
import com.kh.giliboim.common.model.vo.PageInfo;
import com.kh.giliboim.community.model.vo.Post;
import com.kh.giliboim.community.model.vo.PostComment;
import com.kh.giliboim.community.model.vo.Report;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AdminDaoImpl implements AdminDao {

    private final SqlSessionTemplate sqlSession;

    // 회원 관리
    @Override
    public List<Member> allAccount(PageInfo pi) {
        int offset = (pi.getPageNo() - 1) * pi.getPageLimit();
        int limit = pi.getPostLimit();
        RowBounds rowBounds = new RowBounds(offset, limit);
        return sqlSession.selectList("AdminMapper.allAccount", null, rowBounds);
    }

    @Override
    public Member selectAccount(int memberNo) {
        return sqlSession.selectOne("AdminMapper.selectAccount", memberNo);
    }

    @Override
    public void updateAccount(Member member) {
        sqlSession.update("AdminMapper.updateAccount", member);
    }

    @Override
    public void suspendAccount(int memberNo) {
        sqlSession.update("AdminMapper.suspendAccount", memberNo);
    }

    @Override
    public void deleteAccount(int memberNo) {
        sqlSession.delete("AdminMapper.deleteAccount", memberNo);
    }

    // 문의 관리
    @Override
    public List<Inquire> getInquiries(PageInfo pi,String category) {
        int offset = (pi.getPageNo() - 1) * pi.getPageLimit();
        int limit = pi.getPostLimit();
        RowBounds rowBounds = new RowBounds(offset, limit);
        return sqlSession.selectList("AdminMapper.getInquiries", category, rowBounds);
    }

    @Override
    public void deleteInquiry(int inquireNo) {
        sqlSession.delete("AdminMapper.deleteInquiry", inquireNo);
    }

    @Override
    public Inquire getInquiryById(int inquireNo) {
        return sqlSession.selectOne("AdminMapper.getInquiryById", inquireNo);
    }

    @Override
    public void saveReply(Map<String, Object> param) {
        sqlSession.update("AdminMapper.saveReply", param);
    }

    @Override
    public void toggleMemberStatus(int memberNo) {
        sqlSession.update("AdminMapper.toggleMemberStatus", memberNo);
    }

    @Override
    public int selectInquiriesCount(String category) {
        return sqlSession.selectOne("AdminMapper.selectInquiriesCount",category);
    }

    @Override
    public int selectAccountCount() {
        return sqlSession.selectOne("AdminMapper.selectAccountCount");
    }

    // 게시물 관리
    @Override
    public List<Post> getAllPosts(PageInfo pi,String category,Integer memberNo) {
        int offset = (pi.getPageNo() - 1) * pi.getPageLimit();
        int limit = pi.getPostLimit();
        RowBounds rowBounds = new RowBounds(offset, limit);
        Map<String, Object> map = new HashMap<>();
        map.put("category", category);
        map.put("memberNo", memberNo);
        return sqlSession.selectList("AdminMapper.selectAllPosts", map, rowBounds);
    }

    @Override
    public int selectPostCount(String category, Integer memberNo) {
    	Map<String, Object> map = new HashMap<>();
    	map.put("category", category);
    	map.put("memberNo", memberNo);
        return sqlSession.selectOne("AdminMapper.selectPostCount",map);
    }

    @Override
    public void deletePost(int postNo) {
        sqlSession.delete("AdminMapper.deletePost", postNo);
    }

    // 게시물 신고 관리
    @Override
    public List<Report> getAllReports(int postNo) {
        return sqlSession.selectList("AdminMapper.selectAllReports",postNo);
    }

    @Override
    public void deletePostDetail(int reportNo) {
        sqlSession.delete("AdminMapper.deletePostDetail", reportNo);
    }
    
    // 게시물 상세 관리
    @Override
    public Post getPostDetail(int postNo) {
        return sqlSession.selectOne("AdminMapper.getPostDetail", postNo);
    }
    
    @Override
    public List<Report> selectReportsByPostNo(int postNo) {
        return sqlSession.selectList("adminMapper.selectReportsByPostNo", postNo);
    }
 
    // 댓글 관리
	@Override
	public int selectCommentCount(String category, Integer memberNo) {
		Map<String, Object> map = new HashMap<>();
    	map.put("category", category);
    	map.put("memberNo", memberNo);
		return sqlSession.selectOne("AdminMapper.selectCommentCount",map);
	}

	@Override
	 public List<PostComment> getAllComments(PageInfo pi, String category, Integer memberNo) {
        int offset = (pi.getPageNo() - 1) * pi.getPageLimit();
        int limit = pi.getPostLimit();
        RowBounds rowBounds = new RowBounds(offset, limit);
        Map<String, Object> map = new HashMap<>();
    	map.put("category", category);
    	map.put("memberNo", memberNo);
        return sqlSession.selectList("AdminMapper.getAllComments", map, rowBounds);
    }
	
	// 댓글 상세 관리
	@Override
    public PostComment getCommentDetail(int commentNo) {
        return sqlSession.selectOne("AdminMapper.getCommentDetail", commentNo);
    }

    @Override
    public void deleteComment(int commentNo) {
        sqlSession.delete("AdminMapper.deleteComment", commentNo);
    }
    
    // 댓글 신고 관리
    @Override
    public List<Report> selectAllReportsByCommentNo(int commentNo) {
        return sqlSession.selectList("AdminMapper.selectAllReportsByCommentNo", commentNo);
    }

    @Override
    public void deleteCommentDetail(int reportNo) {
        sqlSession.delete("AdminMapper.deleteCommentDetail", reportNo);
    }
}
