package com.kh.giliboim.personal.model.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Friend {
	
	private int toMemberNo;
	private int fromMemberNo;
	private int createDate;
	private String nickname;
	private String profile;
	
}
