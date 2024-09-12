package com.kh.giliboim.personal.model.service;

import java.util.List;
import java.util.Map;

import com.kh.giliboim.account.model.vo.Member;
import com.kh.giliboim.personal.model.vo.Friend;

public interface MyPageService {

	int updateUser(Member member);

	boolean checkPassword(String id, String pwd);
	 // 회원 탈퇴를 위한 비밀번호 확인 메소드 추가
	String checkPasswordByMemberNo(int memberNo);
	// 회원 탈퇴 처리 메소드 추가
	int withdrawUser(int memberNo);

	List<Member> friendList(int memberNo);

	List<Member> searchByNickname(String nickname);

	int addFriend(Map<String, Object> map);

	int checkFriend(Map<String, Object> map);

	boolean deleteFriend(Map<String, Object> map);

	
	
	

}
