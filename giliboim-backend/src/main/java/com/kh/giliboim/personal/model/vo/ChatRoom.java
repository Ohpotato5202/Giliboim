package com.kh.giliboim.personal.model.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {

	private int ChatRoomNo;
	private char status;
	private String nickname;
	private int cnt;
	private String lastMessage; // 마지막 메시지 내용
	private Date lastMessageTime; // 마지막 메시지 시간
	private String profile;
}
