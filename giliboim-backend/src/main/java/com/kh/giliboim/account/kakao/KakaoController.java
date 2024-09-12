package com.kh.giliboim.account.kakao;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.giliboim.account.model.service.AccountService;
import com.kh.giliboim.account.model.vo.Member;
import com.kh.giliboim.jwt.JwtProvider;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import com.kh.giliboim.account.model.vo.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/Social")
public class KakaoController {
	
	private final KakaoService kakao;
	private final AccountService service;
	private final JwtProvider jwtProvider;
	
	@GetMapping("/Login/kakao")
	public void socialLogin(
			@RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "error", required = false) String error,
            HttpServletResponse response
            ){
		log.info("!!!!!!시작함!!!!!!");
		boolean authority = false;
		if(error != null) {
			return;
		}
		
		String kakaoAccsesToken = kakao.getAccessToken(code);
		log.info("카카오 accsesToken =  {}",kakaoAccsesToken);
		
		Map<String, Object> userInfo = kakao.getUserInfo(kakaoAccsesToken);
		log.info("카카오 userInfo =  {}",userInfo);
		
		String userNumber = String.valueOf(userInfo.get("id"));
		
		log.info(userNumber);
		Map<String, String> map = new HashMap<>();
		map.put("social", "kakao");
		map.put("memberId", userNumber);
		
		service.socialLogin(map); //테이블에 없으면 추가
		Member mem = service.selectSocialMember(map);
		// 여기서 기타 작업 해주면 됨.
		if(mem.getAuthorityNo() == 2) {
			authority = true;
		}
		
		//리프레쉬 토큰 가져와서 쿠키저장
		String refreshToken = jwtProvider.createRefreshToken(mem.getMemberNo());
		Cookie cookie = new Cookie("refreshToken",refreshToken);
		cookie.setHttpOnly(true); //HTTP에서만 받을수있음, 클라이언트에서 접근불가
		cookie.setSecure(false); //HTTPS에서만 받기 false << 이거 나중에 설정하면 true로 바꾸기
		cookie.setPath("/"); // 모든페이지 적용
		cookie.setMaxAge(24*60*60); // 1일짜리 저장
		log.info("쿠키 = {}",cookie);
		response.addCookie(cookie);
		
		//에세스토큰 반환
		String ACCESS_TOKEN = jwtProvider.createAccessToken(mem.getMemberNo(),authority);
		
		
		kakao.logout(kakaoAccsesToken);
		
		try {
			log.info("카카오 로그인 성공!!");			
			response.sendRedirect("http://localhost:3000/success?token=" + ACCESS_TOKEN);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			log.info("카카오 로그인 마지막에서 에러");
			e.printStackTrace();
		}
	}
}
