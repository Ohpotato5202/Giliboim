package com.kh.giliboim.community.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostImg {
	
	private int imageNo; 
	private int postNo;
	private String originalName;
	private String changeName;
	
}
