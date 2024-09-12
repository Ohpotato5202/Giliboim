package com.kh.giliboim.personal.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.giliboim.account.model.vo.Member;
import com.kh.giliboim.personal.model.vo.Friend;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MyPageDaoImpl implements MyPageDao {

    private final SqlSession session;

    @Override
    public int updateUser(Member member) {
        return session.update("mypage.updateUser", member);
    }

    @Override
    public Member findMemberById(String id) {
        return session.selectOne("mypage.findMemberById", id);
    }

    @Override
    public Member findMemberByNo(int memberNo) {
        return session.selectOne("mypage.findMemberByNo", memberNo);
    }

    // 회원 탈퇴 시 상태를 'N'으로 업데이트하는 메소드
    @Override
    public int updateStatusToWithdraw(int memberNo) {
        return session.update("mypage.updateStatusToWithdraw", memberNo);
    }

    // 회원 번호로 토큰 삭제
    @Override
    public int deleteTokensByMemberNo(int memberNo) {
        return session.delete("mypage.deleteTokensByMemberNo", memberNo);
    }

	@Override
	public List<Member> friendList(int memberNo) {
		
		return session.selectList("mypage.friendList",memberNo);
	}

	@Override
	public List<Member> searchByNickname(String nickname) {
		return session.selectList("mypage.searchByNickname",nickname);
	}

	@Override
	public int searchFriend(Map<String, Object> map) {
		return session.selectOne("mypage.searchFriend",map);
	}

	@Override
	public void createFriend(Map<String, Object> map) {
		session.insert("mypage.createFriend",map);
	}

	@Override
	public void updateFriend(Map<String, Object> map) {
		session.update("mypage.updateFriend",map);
	}

	@Override
	public int checkFriend(Map<String, Object> map) {
		return session.selectOne("mypage.checkFriend",map);
	}

	@Override
    public int deleteFriend(Map<String, Object> map) {
        return session.delete("mypage.deleteFriend", map);
    }

	
}
