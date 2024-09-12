package com.kh.giliboim.community.model.vo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Post {
	private int postNo;
	private int memberNo;
	private String roadAddress;
	private String title;
	private String content;
	private String status;
	private String createDate;
	private List<Report> reports; // 추가된 필드
	
	private int reportNo;
}
