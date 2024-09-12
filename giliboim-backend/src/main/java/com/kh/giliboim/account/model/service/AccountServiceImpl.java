package com.kh.giliboim.account.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kh.giliboim.account.model.dao.AccountDao;
import com.kh.giliboim.account.model.vo.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

	private final AccountDao dao;

	@Override
	public int insertMemberCheck(Map<String, String> map) {
		return dao.insertMemberCheck(map);
	}

	@Override
	public int verifyDuplicationCheck(String phoneNumber) {
		
		//int result = dao.verifyDuplicationCheck(phoneNumber);//이 번호가 있는지 확인
		int result = dao.verifyDuplicationCount(phoneNumber);//한시간내에 몇번인지 확인
		log.info("첫번째 값 = {}",result);
//		if(result > 0) {
//			result = dao.verifyDuplicationCount(phoneNumber);//한시간내에 몇번인지 확인
//			log.info("두번째 값 = {}",result);
			if(result >= 5) {
				int resultDate = dao.verifyDuplicationDate(phoneNumber);//마지막 시간이 몇인지 확인
				log.info("세번째 값 = {}",resultDate);
				if(result == 5) {
					Map<String, String> map = new HashMap<>();
					String resultDay = Integer.toString(resultDate).substring(1);
					map.put("phoneNumber", phoneNumber);
					map.put("resultDay", resultDay);
					dao.verifyPrevention(map);//마지막시간으로 4개 입력					
				}
				result = resultDate;
			}
		//}
		return result;
		
	}
	
	@Override
	public void verifyInsert(Map<String, String> map) {
		dao.verifyinsert(map);
	}

	@Override
	public int verifyCodeCheck(Map<String, String> map) {
		return dao.verifyCodeCheck(map);
	}

	@Override
	public void verifyCodeDelete(String phoneNumber) {
		dao.verifyCodeDelete(phoneNumber);
	}

	@Override
	public int insertMember(Member member) {
		return dao.insertMember(member);
	}

	@Override
	public Member login(Map<String, String> map) {
		return dao.login(map);
	}

	@Override
	public int phoneCheck(String phone) {
		return dao.phoneCheck(phone);
	}

	@Override
	public String searchId(String phone) {
		return dao.searchId(phone);
	}

	@Override
	public int searchPwd(Map<String, String> map) {
		return dao.searchPwd(map);
	}

	@Override
	public void changePwd(Map<String, String> map) {
		dao.changePwd(map);
	}



	@Override
	public void insertToken(Map<String, Object> map) {
		int result = dao.searchToken(map);
		if (result == 1) {
			dao.updateToken(map);
		} else {
			dao.insertToken(map);				
		}
	}

	@Override
	public Member validateRefreshToken(String tokenId) {
		Integer result = dao.validateRefreshToken(tokenId);
		Member mem = null;
		if(result!=null) {
			mem = dao.searchMember(result);
		}
		return mem;
	}

	@Override
	public Member memberName(int memberNo) {
		return dao.memberName(memberNo);
  }
  
  @Override
	public void socialLogin(Map<String, String> map) {
		int result = dao.socialLogin(map);
		if(result == 0) {
			dao.insertSocialMember(map);
	  }
  }

	@Override
	public Member selectSocialMember(Map<String, String> map) {
		return dao.selectSocialMember(map);
	}

	@Override
	public void deleteToken(int memberNo) {
		dao.deleteToken(memberNo);

	}
		

	
}
