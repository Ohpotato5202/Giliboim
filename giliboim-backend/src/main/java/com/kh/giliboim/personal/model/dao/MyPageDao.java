package com.kh.giliboim.personal.model.dao;

import java.util.List;
import java.util.Map;

import com.kh.giliboim.account.model.vo.Member;
import com.kh.giliboim.personal.model.vo.Friend;

public interface MyPageDao {

	int updateUser(Member member);

	Member findMemberById(String id);

	// 회원 탈퇴를 위해 회원번호로 회원 찾기 메소드 추가
	int updateStatusToWithdraw(int memberNo);

	// 회원 탈퇴 처리 시 상태를 'N'으로 업데이트하는 메소드 추가
	Member findMemberByNo(int memberNo);

	int deleteTokensByMemberNo(int memberNo);

	List<Member> friendList(int memberNo);

	List<Member> searchByNickname(String nickname);

	int searchFriend(Map<String, Object> map);

	void createFriend(Map<String, Object> map);

	void updateFriend(Map<String, Object> map);

	int checkFriend(Map<String, Object> map);

	int deleteFriend(Map<String, Object> map);

}
