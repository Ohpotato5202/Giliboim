package com.kh.giliboim.account.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.giliboim.account.model.service.AccountService;
import com.kh.giliboim.account.model.vo.Member;
import com.kh.giliboim.jwt.JwtProvider;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/Account")
public class AccountController {

	private final AccountService service;
	private final JwtProvider jwtProvider;
	private final PasswordEncoder encoder;
	
	@GetMapping("/memberName")
	public Member memberName(
			HttpServletRequest request
			) {		
		String token = jwtProvider.resolveToken(request);
		int memberNo = jwtProvider.getTokenMemberNo(token);
		
		return service.memberName(memberNo);
		
	}
	
	@GetMapping("/insertMemberCheck")
	public int insertMemberCheck(
			@RequestParam("key") String name,
			@RequestParam("value1") String value			
			) {
		Map<String, String> map = new HashMap<>();
		map.put("key", name);
		map.put("value", value);
		
		return  service.insertMemberCheck(map);
	}
	
	@PostMapping("/insertMember")
	public int insertMember(
			@RequestBody Member member
			) {
		log.info("member값 = {}",member);
		String changePwd = encoder.encode(member.getPwd());
		member.setPwd(changePwd);
		
		int result = service.insertMember(member);
		
		return result;
	}
	
	@GetMapping("/login")
	public ResponseEntity<?> login(			
			@RequestParam String id,
			@RequestParam String password,
			HttpServletResponse response
			) {
		boolean authority = false;
		log.info("id내용 {}",id);
		log.info("password내용 {}",password);

		Map<String, String> map = new HashMap<>();
		map.put("id", id);
		
		Member result = service.login(map);
		
		if(!encoder.matches(password, result.getPwd())){
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		if(result.getAuthorityNo() == 2) {
			authority = true;
		}
		
		//리프레쉬 토큰 가져와서 쿠키저장
		String refreshToken = jwtProvider.createRefreshToken(result.getMemberNo());
		Cookie cookie = new Cookie("refreshToken",refreshToken);
		cookie.setHttpOnly(true); //HTTP에서만 받을수있음, 클라이언트에서 접근불가
		cookie.setSecure(false); //HTTPS에서만 받기 false
		cookie.setPath("/"); // 모든페이지 적용
		cookie.setMaxAge(24*60*60); // 1일짜리 저장
		log.info("쿠키 = {}",cookie);
		response.addCookie(cookie);
		
		//에세스토큰 반환
		String ACCESS_TOKEN = jwtProvider.createAccessToken(result.getMemberNo(),authority);
		
		return ResponseEntity.ok(ACCESS_TOKEN);
	}
	
	@PostMapping("/refreshToken")
	public ResponseEntity<?> refreshToken(
			HttpServletRequest request, 
			HttpServletResponse response
			){
		String ACCESS_TOKEN = null;
		String refreshToken = null;
		
		for(Cookie cookie : request.getCookies()) {
			 if ("refreshToken".equals(cookie.getName())) {
	                refreshToken = cookie.getValue();
	                break;
	            }
		}
		
		if (refreshToken == null) {
            return ResponseEntity.status(401).body("Refresh Token is missing");
        }		
	
		Member mem = jwtProvider.validateRefreshToken(refreshToken);
		if(mem != null) {
			boolean admin = false;
			if(mem.getAuthorityNo() == 2) {
				admin = true;
			}
			ACCESS_TOKEN = jwtProvider.createAccessToken(mem.getMemberNo(), admin);
		}
		else {
			return ResponseEntity.status(401).body("Refresh Token is missing");
		}
		return ResponseEntity.ok(ACCESS_TOKEN);
	}
	
	
	@GetMapping("/phoneCheck")
	public int phoneCheck(
			@RequestParam String phone
			) {
	return service.phoneCheck(phone);
	}
	
	@GetMapping("/searchId")
	public String searchId(
			@RequestParam String phone
			) {
		return service.searchId(phone);
	}
	
	@GetMapping("/searchPwd")
	public int searchPwd(
			@RequestParam String phone,
			@RequestParam String userId
			) {
		Map<String, String> map = new HashMap<>();
		map.put("phone", phone);
		map.put("userId", userId);
		
		return service.searchPwd(map);
	}
	
	@PutMapping("/changePwd")
	public void changePwd(
			@RequestParam String id,
			@RequestParam String pwd
			) {
		Map<String, String> map = new HashMap<>();
		String changePwd = encoder.encode(pwd);
		map.put("pwd",changePwd);
		map.put("id",id);
		service.changePwd(map);
	}

	@DeleteMapping("logOut")
	public ResponseEntity<?> logOut(
			HttpServletRequest request
			){
		String token = jwtProvider.resolveToken(request);
		int memberNo = jwtProvider.getTokenMemberNo(token);
		
		service.deleteToken(memberNo);
		
		return ResponseEntity.ok("");
	}
}














