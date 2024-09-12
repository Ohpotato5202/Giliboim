package com.kh.giliboim.account.kakao;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class KakaoService {
	
	@Value("${kakao.api_key}")
	private String kakaoApiKey;
	
	@Value("${kakao.redirect_uri}")
	private String redirectUri;
	
	public String getAccessToken(String code) {
	    String tokenUrl = "https://kauth.kakao.com/oauth/token";

	    RestTemplate restTemplate = new RestTemplate();

	    HttpHeaders headers = new HttpHeaders();
	    headers.set("Content-Type", "application/x-www-form-urlencoded");

	    UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(tokenUrl)
	        .queryParam("grant_type", "authorization_code")
	        .queryParam("client_id", kakaoApiKey)
	        .queryParam("redirect_uri", redirectUri)
	        .queryParam("code", code);

	    HttpEntity<String> entity = new HttpEntity<>(headers);

	    try {
	        ResponseEntity<Map> response = restTemplate.exchange(
	            builder.toUriString(),
	            HttpMethod.POST,
	            entity,
	            Map.class
	        );

	        Map<String, Object> responseBody = response.getBody();
	        if (responseBody != null) {
	            return (String) responseBody.get("access_token");
	        }
	    } catch (RestClientException e) {
	        // 에러 로깅 또는 다른 처리
	        log.info("꺄아아악 에러다~~Error occurred: {}",e.getMessage());
	    }

	    return null;
	}


	public Map<String, Object> getUserInfo(String accsesToken) {
		String kakaoInfoUri = "https://kapi.kakao.com/v2/user/me"; 
		
		 RestTemplate restTemplate = new RestTemplate();

		 HttpHeaders headers = new HttpHeaders();
		 headers.set("Authorization", "Bearer " + accsesToken);
		 headers.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
		    
		 HttpEntity<String> entity = new HttpEntity<>(headers);
		 
		 try {
			 ResponseEntity<Map> response = restTemplate.exchange(
					 kakaoInfoUri, 
					 HttpMethod.GET, 
					 entity, 
					 Map.class
					 );	
			 return response.getBody();
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
		 
	}


	public void logout(String accsesToken) {
		String kakaoLogoutUri = "https://kapi.kakao.com/v1/user/logout";
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accsesToken);
		 
		HttpEntity<String> entity = new HttpEntity<>(headers);
		
		try {
			restTemplate.exchange(
					kakaoLogoutUri, 
					HttpMethod.GET, 
					entity, 
					Map.class
					);	
			log.info("로그아웃 성공");
		} catch (Exception e) {
			log.info("로그아웃 에러");
		}
		 
	}
}
