package com.kh.giliboim.account.model.dao;

import java.util.Map;

import com.kh.giliboim.account.model.vo.Member;

public interface AccountDao {

	int insertMemberCheck(Map<String, String> map);

	int verifyDuplicationCheck(String phoneNumber);

	int verifyDuplicationCount(String phoneNumber);

	int verifyDuplicationDate(String phoneNumber);

	void verifyPrevention(Map<String, String> map);

	int verifyCodeCheck(Map<String, String> map);

	void verifyinsert(Map<String, String> map);

	void verifyCodeDelete(String phoneNumber);

	int insertMember(Member member);

	Member login(Map<String, String> map);

	int phoneCheck(String phone);

	String searchId(String phone);

	int searchPwd(Map<String, String> map);

	void changePwd(Map<String, String> map);

	void insertToken(Map<String, Object> map);

	int searchToken(Map<String, Object> map);

	void updateToken(Map<String, Object> map);

	Integer validateRefreshToken(String tokenId);

	Member searchMember(Integer result);

	Member memberName(int memberNo);
	
	int socialLogin(Map<String, String> map);

	Member selectSocialMember(Map<String, String> map);

	int insertSocialMember(Map<String, String> map);

	void deleteToken(int memberNo);


}
