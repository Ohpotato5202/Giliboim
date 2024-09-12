package com.kh.giliboim.personal.model.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatComment {

	private int chatCommentNo;
	private int chatRoomNo;
	private int memberNo;
	private String chatText;
	private String nickname;
	private String createDate; 
}
