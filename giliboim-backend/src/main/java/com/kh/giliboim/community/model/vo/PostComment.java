package com.kh.giliboim.community.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostComment{
	private int pcNo;
	private int memberNo;
	private int postNo;
	private String content;
	private String createDate;
	private String category;
	private int reportNo;
}
