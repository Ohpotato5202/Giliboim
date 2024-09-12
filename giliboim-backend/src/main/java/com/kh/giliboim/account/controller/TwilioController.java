package com.kh.giliboim.account.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.giliboim.account.model.service.AccountService;
import com.kh.giliboim.account.model.service.TwilioService;
import com.kh.giliboim.account.model.vo.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/phoneVerify")
@RequiredArgsConstructor
public class TwilioController {

	private final TwilioService twilioService;
	private final AccountService service;
	private String sentCode;

	@PostMapping("/send")
	public int sendVerificationCode(@RequestParam String phoneNumber) {

		log.info("전화번호 값 확인 = {}", phoneNumber);

		int check = service.verifyDuplicationCheck(phoneNumber); // 해당 전화번호로 인증키 발송 여부 확인.

		if (check < 5) { // 한시간안에 5번이상 보냈는지 확인 + 보냈다면 마지막에 보낸 시간 시,분 반환
			sentCode = twilioService.sendVerificationCode(phoneNumber);// 해당 번호로 문자를 보내고, 랜덤 6숫자를 받아옴 0~999999
			Map<String, String> map = new HashMap<>();
			map.put("phoneNumber", phoneNumber);
			map.put("sentCode", sentCode);
			service.verifyInsert(map); // 테이블 추가

		}

		return check;

	}

	@PostMapping("/verify")
	public int verifyCode(@RequestParam String code, @RequestParam String phoneNumber) {
		Map<String, String> map = new HashMap<>();
		map.put("phoneNumber", phoneNumber);
		map.put("code", code);

		int result = service.verifyCodeCheck(map);
		
		if (result == 1)
			service.verifyCodeDelete(phoneNumber);

		return result;

	}
}
