package com.kh.giliboim.community.model.vo;

import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper= false)
public class PostExt extends Post{
	
	// ■ 목록, 상세 조회를 위한 확장 vo 클래스 
	
	// 게시글 상세조회시 필요한 이미지 배열 
	private List<PostImg> postImgs;
	
	// 게시글 목록 조회시 필요한 이미지(썸네일) 
	private String thumbnail;
	private int likeCount;
	private int commentCount;
	
	// 게시글 상세 조회시 필요한 사용자 닉네임, 프로필 
	private String nickname;
	private String profile;
	
}
