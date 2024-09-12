package com.kh.giliboim.account.model.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.giliboim.account.model.vo.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@RequiredArgsConstructor
@Slf4j
public class AccountDaoImpl implements AccountDao{

	private final SqlSessionTemplate session;

	@Override
	public int insertMemberCheck(Map<String, String> map) {
		return session.selectOne("account.insertMemberCheck",map);
	}

	@Override
	public int verifyDuplicationCheck(String phoneNumber) {
		return session.selectOne("account.verifyDuplicationCheck",phoneNumber);
	}

	@Override
	public int verifyDuplicationCount(String phoneNumber) {
		return session.selectOne("account.verifyDuplicationCount",phoneNumber);
	}

	@Override
	public int verifyDuplicationDate(String phoneNumber) {
		return session.selectOne("account.verifyDuplicationDate",phoneNumber);
	}

	@Override
	public void verifyPrevention(Map<String, String> map) {
		session.insert("account.verifyPrevention",map);
	}

	@Override
	public int verifyCodeCheck(Map<String, String> map) {
		return session.selectOne("account.verifyCodeCheck",map);
	}

	@Override
	public void verifyinsert(Map<String, String> map) {
		session.insert("account.verifyInsert",map);
	}

	@Override
	public void verifyCodeDelete(String phoneNumber) {
		session.delete("account.verifyCodeDelete",phoneNumber);
	}

	@Override
	public int insertMember(Member member) {
		
		int result = session.insert("account.insertMember",member);
		result *= session.insert("account.insertSetting", member);
		
		return result;
	}

	@Override
	public Member login(Map<String, String> map) {
		return session.selectOne("account.login",map);
	}

	@Override
	public int phoneCheck(String phone) {
		return session.selectOne("account.phoneCheck",phone);
	}

	@Override
	public String searchId(String phone) {
		return session.selectOne("account.searchId",phone);
	}

	@Override
	public int searchPwd(Map<String, String> map) {
		return session.selectOne("account.searchPwd",map);
	}

	@Override
	public void changePwd(Map<String, String> map) {
		session.update("account.changePwd",map);
	}

	@Override
	public void insertToken(Map<String, Object> map) {
		session.insert("account.insertToken",map);
		
	}

	@Override
	public int searchToken(Map<String, Object> map) {
		return session.selectOne("account.searchToken",map);
	}

	@Override
	public void updateToken(Map<String, Object> map) {
		session.update("account.updateToken",map);		
	}

	@Override
	public Integer validateRefreshToken(String tokenId) {
		return session.selectOne("account.validateRefreshToken",tokenId);
	}

	@Override
	public Member searchMember(Integer result) {
		return session.selectOne("account.searchMember",result);
	}

	@Override
	public Member memberName(int memberNo) {
		return session.selectOne("account.memberName",memberNo);
	}
  
	@Override
	public int socialLogin(Map<String, String> map) {
		return session.selectOne("account.socialLogin",map);
	}

	@Override
	public Member selectSocialMember(Map<String, String> map) {
		return session.selectOne("account.selectSocialMember",map);
	}

	@Override
	public int insertSocialMember(Map<String, String> map) {
		return session.insert("account.insertSocialMember",map);
	}

	@Override
	public void deleteToken(int memberNo) {
		session.delete("account.deleteToken",memberNo);
	}
	
	
}
