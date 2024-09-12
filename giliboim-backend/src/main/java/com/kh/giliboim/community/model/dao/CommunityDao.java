package com.kh.giliboim.community.model.dao;

import java.util.List;
import java.util.Map;

import com.kh.giliboim.common.model.vo.PageInfo;
import com.kh.giliboim.community.model.vo.Post;
import com.kh.giliboim.community.model.vo.PostComment;
import com.kh.giliboim.community.model.vo.PostExt;
import com.kh.giliboim.community.model.vo.PostImg;

public interface CommunityDao {
    
   

    Post getPostDetail(int postNo);

    List<PostComment> getCommentsByPostNo(int postNo);

    int addComment(PostComment comment);

    int incrementLikeCount(Map<String, Object> map);

    int setAddCount(Map<String, Object> map);

    int getLikeCount(int postNo);
    
    int insertPost(Post post);

    int insertPostImg(PostImg pi);
  
    int reportPost(Map<String, Object> params);  // 신고 기능 추가
   
	List<Post> selectList(PageInfo pi);
	
	int selectListCount();
	
	int deletePost(Map<String, Object> param);

	int deleteComment(Map<String, Object> param);

	int updatePost(PostExt post);

	int updatePostImg(PostImg pi);

	int deletePostImg(List<Integer> deleteList);

	int updateComment(Map<String, Object> param);
		
}
