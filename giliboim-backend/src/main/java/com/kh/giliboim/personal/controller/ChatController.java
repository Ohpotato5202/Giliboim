package com.kh.giliboim.personal.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.giliboim.account.model.vo.Member;
import com.kh.giliboim.jwt.JwtProvider;
import com.kh.giliboim.personal.model.service.ChatService;
import com.kh.giliboim.personal.model.vo.ChatComment;
import com.kh.giliboim.personal.model.vo.ChatRoom;
import com.kh.giliboim.personal.model.vo.ChatRoomMember;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {

	 private final ChatService service;
	 private final JwtProvider provider;
	 
	 
	   @GetMapping("/chatRoomListSearch/{keyword}")
	   public List<ChatRoom> chatRoomListSearch(HttpServletRequest request,
			   @PathVariable String keyword){
		   Map<String, Object> map = new HashMap<>();
		   
		   
			  String token = provider.resolveToken(request);
			  int memberNo = provider.getTokenMemberNo(token);
			  map.put("keyword", keyword);
			  map.put("memberNo", memberNo);
			  log.info("map정보 = {}",map);
			  
		      return service.chatRoomListSearch(map);
		   }

	   @GetMapping("/member")
	   public Member selectLoginMember(HttpServletRequest request) {
		   
	  		String token = provider.resolveToken(request);
	  		int memberNo = provider.getTokenMemberNo(token);
	  		
	  		Member member = service.selectLoginMember(memberNo);
	  		return member;
	   }
	   
	   @GetMapping("/chatRoomList")
	   public List<ChatRoom> selectChatRooms(HttpServletRequest request){
		   
		  String token = provider.resolveToken(request);
		  int memberNo = provider.getTokenMemberNo(token);
		  
	      return service.selectChatRooms(memberNo);
	   }
	   
	 
	   
	   @GetMapping("/chatMessage/chatRoomNo/{chatRoomNo}")
	   public List<ChatComment> selectMessages(@PathVariable int chatRoomNo){
		   List<ChatComment> selectMessages = service.selectMessages(chatRoomNo);
		   log.debug("selectMessages {}", selectMessages);
		   return selectMessages;
	   }
	   
	   @GetMapping("/chatRoomJoin/chatRoomNo/{chatRoomNo}")
	   public List<Member> selectChatRoomMembers(@PathVariable int chatRoomNo){
	      return service.selectChatRoomMembers(chatRoomNo);
	   }
	   
	   @PostMapping("/chatRoomJoin/chatRoomNo/{chatRoomNo}/userNo/{userNo}")
	   public void joinChatRoom(
			   @PathVariable int chatRoomNo,
			   @PathVariable int memberNo,
			   ChatRoomMember crm
			   ) {
		   log.info("{}",crm);
		   service.joinChatRoom(crm);	   
	   }

	
}
