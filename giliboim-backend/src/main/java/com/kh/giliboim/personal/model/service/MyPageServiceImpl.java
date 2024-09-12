package com.kh.giliboim.personal.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kh.giliboim.personal.model.dao.MyPageDao;
import com.kh.giliboim.personal.model.vo.Friend;
import com.kh.giliboim.account.model.vo.Member;
import com.kh.giliboim.personal.model.dao.InquiriesDao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MyPageServiceImpl implements MyPageService {

	private final MyPageDao Dao;

	@Override
	public int updateUser(Member member) {
		return Dao.updateUser(member);
	}

	@Override
	public boolean checkPassword(String id, String pwd) {
		Member member = Dao.findMemberById(id);
		return member != null && member.getPwd().equals(pwd);
	}

	@Override
	public String checkPasswordByMemberNo(int memberNo) {
		Member member = Dao.findMemberByNo(memberNo);
		return member.getPwd();
	}

	 @Override
	    public int withdrawUser(int memberNo) {
	        // 회원 상태를 탈퇴로 업데이트
	        int result = Dao.updateStatusToWithdraw(memberNo);
	        
	        if (result > 0) {
	            // 탈퇴가 성공하면 토큰을 삭제
	            Dao.deleteTokensByMemberNo(memberNo);
	        }

	        return result;
	    }

	@Override
	public List<Member> friendList(int memberNo) {
		return Dao.friendList(memberNo);
	}

	@Override
	public List<Member> searchByNickname(String nickname) {
		return Dao.searchByNickname(nickname);
	}

	@Override
	public int addFriend(Map<String, Object> map) {
		int result = Dao.searchFriend(map);
		
		if(result == 0) {
			Dao.createFriend(map);
		} else {
			Dao.updateFriend(map);
		}
		return result;
	}

	@Override
	public int checkFriend(Map<String, Object> map) {
		return Dao.checkFriend(map);
	}

	@Override
    public boolean deleteFriend(Map<String, Object> map) {
        int result = Dao.deleteFriend(map);
        return result > 0; // 삭제된 행의 수가 1 이상이면 삭제 성공
    }

	
	

	

}
