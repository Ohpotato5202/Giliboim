package com.kh.giliboim.personal.model.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inquiry {
	
	private int inquireNo;          // 문의 번호
    private int memberNo;           // 회원 번호
    private String title;           // 문의 제목
    private String inquireContent;  // 문의 내용
    private String createDate;        // 작성일
    private String status;          // 답변 여부
    private String answerContent;   // 답변 내용

}
