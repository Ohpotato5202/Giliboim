package com.kh.giliboim.account.model.service;

import java.util.Map;

import com.kh.giliboim.account.model.vo.Member;

public interface AccountService {

	int insertMemberCheck(Map<String, String> map);

	void verifyInsert(Map<String, String> map);

	int verifyDuplicationCheck(String phoneNumber);

	int verifyCodeCheck(Map<String, String> map);

	void verifyCodeDelete(String phoneNumber);

	int insertMember(Member member);

	Member login(Map<String, String> map);

	int phoneCheck(String phone);

	String searchId(String phone);

	int searchPwd(Map<String, String> map);

	void changePwd(Map<String, String> map);

	void insertToken(Map<String, Object> map);

	Member validateRefreshToken(String tokenId);

	Member memberName(int memberNo);

	void socialLogin(Map<String, String> map);

	Member selectSocialMember(Map<String, String> map);

	void deleteToken(int memberNo);
	
}
