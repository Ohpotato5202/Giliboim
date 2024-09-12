package com.kh.giliboim.personal.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.giliboim.account.model.vo.Member;
import com.kh.giliboim.personal.model.vo.ChatComment;
import com.kh.giliboim.personal.model.vo.ChatRoom;
import com.kh.giliboim.personal.model.vo.ChatRoomMember;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ChatDao {

	private final SqlSessionTemplate session;
	
	public List<ChatRoom> selectChatRooms(int memberNo){
		return session.selectList("chat.selectChatRooms", memberNo);
	}


	public int openChatRoom(Map<String, Object> map) {
		return session.insert("chat.openChatRoom",map);
	}

	public void insertChatMessage(ChatComment ChatComment) {
		session.insert("chat.insertChatMessage", ChatComment);
	}

	public void joinChatRoom(ChatRoomMember crm) {
		session.insert("chat.joinChatRoom",crm);
	}

	public Member selectUser(ChatRoomMember crm) {
		return session.selectOne("chat.selectUser",crm);
	}

	public List<ChatComment> selectMessages(int chatRoomNo) {
		return session.selectList("chat.selectMessages",chatRoomNo);
	}

	public ChatComment selectChatMessage(int chatCommentNo) {
		return session.selectOne("chat.selectChatMessage",chatCommentNo);
	}
	
	public List<Member> selectChatRoomMembers(int chatRoomNo){
		return session.selectList("chat.selectChatRoomMembers",chatRoomNo);
	}

	public void exitMember(ChatRoomMember crm) {
		session.delete("chat.exitMember",crm);
	}

	public void updateUserStatus(ChatRoomMember crm) {
		session.update("chat.updateUserStatus",crm);
	}

	public void openChatRoomMember(Map<String, Object> map) {
		session.insert("chat.openChatRoomMember",map);
	}


	public Member selectLoginMember(int memberNo) {
		return session.selectOne("chat.selectLoginMember", memberNo);
	}

	public List<ChatRoom> chatRoomListSearch(Map<String, Object> map) {
		return session.selectList("chat.chatRoomListSearch",map);
	}

}
