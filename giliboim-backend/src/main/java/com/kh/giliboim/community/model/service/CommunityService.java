package com.kh.giliboim.community.model.service;

import java.util.List;
import java.util.Map;

import com.kh.giliboim.common.model.vo.PageInfo;
import com.kh.giliboim.community.model.vo.Post;
import com.kh.giliboim.community.model.vo.PostComment;
import com.kh.giliboim.community.model.vo.PostImg;

public interface CommunityService {

	  int selectListCount();

	  List<Post> selectList(PageInfo pi);

    Post getPostDetail(int postNo);

    List<PostComment> getCommentsByPostNo(int postNo);

    int addComment(PostComment comment);

    int incrementLikeCount(Map<String, Object> map);

    int setAddCount(Map<String, Object> map);

    int getLikeCount(int postNo);

    int insertPost(Post post, List<PostImg> piArr) throws Exception;
    
    int reportPost(Map<String, Object> params) throws Exception;  // 신고 기능 추가

	int deletePost(Map<String, Object> param);

	int deleteComment(Map<String, Object> param);

	int updatePost(Map<String, Object> param);

	int updateComment(Map<String, Object> param);
	
}
