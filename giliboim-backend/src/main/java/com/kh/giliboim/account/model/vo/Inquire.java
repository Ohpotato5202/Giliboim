package com.kh.giliboim.account.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inquire {
	
    private int inquireNo;
    private int memberNo;
    private String title;
    private String inquireContent;
    private String createDate;
    private String status;
    private String answerContent;

}
