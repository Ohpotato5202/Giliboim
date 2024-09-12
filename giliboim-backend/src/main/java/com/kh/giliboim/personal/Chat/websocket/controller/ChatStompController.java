package com.kh.giliboim.personal.Chat.websocket.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import com.kh.giliboim.account.model.vo.Member;
import com.kh.giliboim.personal.model.service.ChatService;
import com.kh.giliboim.personal.model.vo.ChatComment;
import com.kh.giliboim.personal.model.vo.ChatRoomMember;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Controller
@Slf4j
public class ChatStompController {

   private final ChatService service;
   
   @MessageMapping("/sendMessage/chatRoomNo/{chatRoomNo}")
   @SendTo("/chat/chatRoomNo/{chatRoomNo}/message")                    // 메세지를 다시 보내기 위한 발행용 어노테이션
   public ChatComment insertChatMessage(
            @DestinationVariable int chatRoomNo,   //MessageMapping의 경우 PathVariable이 아닌 DestinationVariable사용
            ChatComment chatComment
		   ) {
      log.info("chatRoomNo ?? {} ", chatRoomNo);
	  log.info("ChatComment ?? {} ", chatComment);
      
      // 1) DB에 채팅메세지 등록
      // 2) 같은방 사용자에게 채팅내용 전달
	  ChatComment comment = service.insertChatMessage(chatComment);
	  log.debug("comment {}", comment);
	  
	  return comment;
   }
   
   @MessageMapping("/chatRoomMember/{chatRoomNo}/{userNo}/newMember")
   @SendTo("/chat/chatRoomNo/{chatRoomNo}/newMember")
   public Member newMember(
            @DestinationVariable int chatRoomNo,
            @DestinationVariable int memberNo,
            ChatRoomMember crm,
            Member m
         ) {
      crm.setChatRoomNo(chatRoomNo);
      crm.setMemberNo(memberNo);
      
      log.info("crj = {} ", crm);
      // 1) ChatRoomJoin에 데이터 추가
      service.joinChatRoom(crm);
      
      // 2) 참여한 회원정보 조회
      m = service.selectUser(crm);
      
      return m;
   }
   
   @MessageMapping("/ChatRoomMember/{chatRoomNo}/{userNo}/delete")
   @SendTo("/chat/chatRoomNo/{chatRoomNo}/exitMember")
   public Member exitMember(
		   @DestinationVariable int chatRoomNo,
		   @DestinationVariable int memberNo,
		   @RequestBody Member m
		   ) {
	   // ChatRoonJoin 테이블에서 데이터 제거
	   ChatRoomMember crm = new ChatRoomMember();
	   crm.setChatRoomNo(chatRoomNo);
	   crm.setMemberNo(memberNo);
	   
	   service.exitMember(crm);
	   
	   // 나가기한 회원정보 반환
	   return m;
	   
   }
   
   @MessageMapping("/ChatRoomMember/chatRoomNo/{chatRoomNo}/updateStatus")
   @SendTo("/chat/chatRoomNo/{chatRoomNo}/updateStatus")
   public Member updateStatus(
		@DestinationVariable int chatRoomNo,
		@RequestBody Member m
		   ) {
	   ChatRoomMember crm = new ChatRoomMember();
	   crm.setMemberNo(m.getMemberNo());
	   crm.setChatRoomNo(chatRoomNo);
	   service.updateUserStatus(crm);
	   
	   return m;
   }
}
