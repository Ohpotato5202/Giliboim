package com.kh.giliboim.community.model.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor 
@EqualsAndHashCode(callSuper= false)
public class PostCommentExt extends PostComment{
	
	private String nickname;
	private String profile;
}

