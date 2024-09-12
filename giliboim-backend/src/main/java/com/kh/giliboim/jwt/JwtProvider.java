package com.kh.giliboim.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.kh.giliboim.account.model.service.AccountService;
import com.kh.giliboim.account.model.vo.Member;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.Console;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
public class JwtProvider {

    private final String secretKey = "this_is_very_secret_code_wa_sans_jenjang";
    private final AccountService service;
    
    public String createAccessToken(int userId, boolean admin) {
    	log.info("엑세스토큰 발행");
        return JWT.create()
                .withSubject(String.valueOf(userId)) //사용자 식별번호
                .withExpiresAt(new Date(System.currentTimeMillis() + (1000*60*5))) // 5분
                .withIssuedAt(new Date())//발행시간
                .withClaim("admin", admin)//일반 유저, 관리자 구분
                .withIssuer("giliboim.com")//발행한 서버
                .sign(Algorithm.HMAC512(secretKey.getBytes()));//암호키
    }

    public String createRefreshToken(int userId) {
    	
    	String tokenId = UUID.randomUUID().toString();

    	Map<String, Object> map = new HashMap<>();
    	map.put("tokenId", tokenId);
    	map.put("userId", userId);
    	
    	service.insertToken(map);
    	
        return JWT.create()
                .withSubject(String.valueOf(userId))
                .withExpiresAt(new Date(System.currentTimeMillis() + 86400000)) // 1일
                .withIssuedAt(new Date())
                .withJWTId(tokenId)
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }
    
    public boolean validateToken(String token) { //엑세스토큰
        try {
            // 서명 알고리즘 및 검증기 설정
            Algorithm algorithm = Algorithm.HMAC512(secretKey.getBytes());
            JWTVerifier verifier = JWT.require(algorithm)
                                      .build();

            // 토큰 검증 및 디코딩
            DecodedJWT decodedJWT = verifier.verify(token);

            // 만료 시간 검증
            Date expiration = decodedJWT.getExpiresAt();
            return expiration != null && expiration.after(new Date());
        } catch (JWTVerificationException ex) {
        	log.info("토큰쪽에서 잘못뙜어용~~");
        	return false;
        }
    }
    
    public Member validateRefreshToken(String token) { //리프레쉬토큰
    	 try {
             // 서명 알고리즘 및 검증기 설정
             Algorithm algorithm = Algorithm.HMAC512(secretKey.getBytes());
             JWTVerifier verifier = JWT.require(algorithm)
                                       .build();
             // 토큰 검증 및 디코딩
             DecodedJWT decodedJWT = verifier.verify(token);

             // 만료 시간 검증
//             Date expiration = decodedJWT.getExpiresAt();
//             log.info("4");
//             if (expiration != null && expiration.getTime() > System.currentTimeMillis()) {
//            	    return null;
//            	}
             String tokenId = decodedJWT.getId();
             Member mem = service.validateRefreshToken(tokenId);
             return mem;
             
         } catch (JWTVerificationException ex) {
         	return null;
         }
    }
    
    public Authentication getAuthentication(String token) {
    	DecodedJWT decodedJWT = 
    			JWT.require(Algorithm.HMAC512(secretKey.getBytes())).build().verify(token);
    	String userId = decodedJWT.getSubject();
    	boolean isAdmin = decodedJWT.getClaim("admin").asBoolean();
    	
    	Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
    	if (isAdmin) {
    		authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
    	} else {
    		authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
    	}
    	
    	// UsernamePasswordAuthenticationToken을 생성하여 
    	// Spring Security 컨텍스트에 저장할 수 있는 Authentication 객체 반환
    	return new UsernamePasswordAuthenticationToken(userId, null, authorities);
    }

    public String resolveToken(HttpServletRequest request) {
    	// Authorization 헤더에서 토큰을 추출
    	String bearerToken = request.getHeader("Authorization");
    	if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
    		// "Bearer " 문자열을 제거하고 순수한 토큰만 반환
    		String result = bearerToken.substring(7);
    		log.info("asdfasdfasdf = {}",result);
    		return result;
    	}
    	return null; // Authorization 헤더가 없거나 Bearer로 시작하지 않으면 null 반환
    }
    
    public int getTokenMemberNo(String token) {
        DecodedJWT decodedJWT = 
        		JWT.require(Algorithm.HMAC512(secretKey.getBytes())).build().verify(token);
        String userId = decodedJWT.getSubject();
        
        return Integer.parseInt(userId);
    }
    
}

