package com.kh.giliboim.community.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.giliboim.common.model.vo.PageInfo;
import com.kh.giliboim.community.model.vo.Post;
import com.kh.giliboim.community.model.vo.PostComment;
import com.kh.giliboim.community.model.vo.PostExt;
import com.kh.giliboim.community.model.vo.PostImg;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor // final등 값이 필수로 존재해야 한다면 넣어줌.
@Slf4j // 로그출력시(log.info) 필요함
@Repository
public class CommunityDaoImpl implements CommunityDao {

    private final SqlSessionTemplate session;
    	
    @Override
    public List<Post> selectList(PageInfo pi) {
      // TODO Auto-generated method stub

      // MyBatis의 RowBounds객체를 이용한 페이징 처리

      int offset = (pi.getPageNo() - 1) * pi.getPageLimit();
      int limit = pi.getPostLimit();
      RowBounds rowBounds = new RowBounds(offset, limit);

      return session.selectList("community.selectList", null, rowBounds);
    }

    @Override
    public int selectListCount() {
      // TODO Auto-generated method stub
      return session.selectOne("community.selectListCount");
    }
	
    
    @Override
    public Post getPostDetail(int postNo) {
        return session.selectOne("community.getPostDetail", postNo);
    }

    @Override
    public List<PostComment> getCommentsByPostNo(int postNo) {
        return session.selectList("community.getCommentsByPostNo", postNo);
    }

    @Override
    public int addComment(PostComment comment) {
        return session.insert("community.addComment", comment);
    }

    @Override
    public int incrementLikeCount(Map<String, Object> map) {
        return session.selectOne("community.incrementLikeCount", map);
    }

    @Override
    public int setAddCount(Map<String, Object> map) {
        return session.insert("community.setAddCount", map);
    }

    @Override
    public int getLikeCount(int postNo) {
        return session.selectOne("community.getLikeCount", postNo);
    }

    @Override
    public int insertPost(Post post) {
        return session.insert("community.insertPost", post);
    }

    @Override
    public int insertPostImg(PostImg pi) {
        return session.insert("community.insertPostImg", pi);
    }
    @Override
    public int reportPost(Map<String, Object> params) {
        return session.insert("community.reportPost", params);
    }

	@Override
	public int deletePost(Map<String, Object> param) {
		return session.update("community.deletePost", param);
	}

	@Override
	public int deleteComment(Map<String, Object> param) {
		return session.delete("community.deleteComment", param);
	}

	@Override
	public int updatePostImg(PostImg pi) {
		return session.update("community.updatePostImg", pi);
	}

	@Override
	public int deletePostImg(List<Integer> deleteList) {
		return session.delete("community.deletePostImg", deleteList);
	}
	
	@Override
	public int updatePost(PostExt post) {
		return session.update("community.updatePost", post);
	}

	@Override
	public int updateComment(Map<String, Object> param) {
		
		return session.update("community.updateComment", param);
	}


}
