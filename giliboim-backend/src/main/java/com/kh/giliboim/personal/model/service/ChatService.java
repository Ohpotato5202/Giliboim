package com.kh.giliboim.personal.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kh.giliboim.account.model.vo.Member;
import com.kh.giliboim.personal.model.dao.ChatDao;
import com.kh.giliboim.personal.model.vo.ChatComment;
import com.kh.giliboim.personal.model.vo.ChatRoom;
import com.kh.giliboim.personal.model.vo.ChatRoomMember;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

	private final ChatDao dao;

	public List<ChatRoom> selectChatRooms(int memberNo) {
		return dao.selectChatRooms(memberNo);
	}

	public void openChatRoom(Map<String, Object> map ) {
		dao.openChatRoom(map);
		log.info("첫번째 실행 = {}",map);
		dao.openChatRoomMember(map);
		log.info("두번째 실행 = {}",map);
	}

	public ChatComment insertChatMessage(ChatComment ChatComment) {
		
		dao.insertChatMessage(ChatComment);
		
		return dao.selectChatMessage(ChatComment.getChatCommentNo());
	}

	public void joinChatRoom(ChatRoomMember crm) {
		try {
			dao.joinChatRoom(crm);
		}catch(Exception e) {
			
		}
	}

	public Member selectUser(ChatRoomMember crm) {
		return dao.selectUser(crm);
	}

	public List<ChatComment> selectMessages(int chatRoomNo) {
		return dao.selectMessages(chatRoomNo);
	}
	
	public List<Member> selectChatRoomMembers(int chatRoomNo) {
		return dao.selectChatRoomMembers(chatRoomNo);
	}

	public void exitMember(ChatRoomMember crm) {
		dao.exitMember(crm);
	}

	public void updateUserStatus(ChatRoomMember crm) {
		dao.updateUserStatus(crm);
	}

	public Member selectLoginMember(int memberNo) {
		return dao.selectLoginMember(memberNo);
	}

	public List<ChatRoom> chatRoomListSearch(Map<String, Object> map) {
		return dao.chatRoomListSearch(map);
	}
	

	
}
