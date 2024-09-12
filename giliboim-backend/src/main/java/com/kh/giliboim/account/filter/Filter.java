package com.kh.giliboim.account.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.kh.giliboim.jwt.JwtProvider;

import io.jsonwebtoken.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class Filter extends HttpFilter {

	private static final long serialVersionUID = 1L;
	private final JwtProvider jwtProvider;

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, java.io.IOException, ServletException{

        String requestURI = request.getRequestURI();
        log.debug("requestURl {}", requestURI);
        // 로그인과 회원가입 관련 URL을 제외

        if (requestURI.startsWith("/api/Account") 
        		|| requestURI.startsWith("/api/phoneVerify") 
        		|| requestURI.startsWith("/api/static")
        		|| requestURI.startsWith("/api/stompServer")
        		|| requestURI.startsWith("/api/Social")        	
        		){
        	chain.doFilter(request, response); // 다음 필터나 컨트롤러로 요청 전달
            return;
        }	
        
        // Authorization 헤더에서 토큰 추출
        String token = jwtProvider.resolveToken(request);
        log.debug("token 정보 {}", token);
        
        if (token != null && jwtProvider.validateToken(token)) {
        	log.info("이거 맞지?");
        	//role이 설정되어있지 않으므로 엑세스토큰에서 해놨던 admin의 boolean값으로 role설정하고 옴
        	Authentication authentication = jwtProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        	
            // 유효한 토큰이 있는 경우, 다음 필터나 컨트롤러로 요청을 전달
            chain.doFilter(request, response);
        } else {
            // 토큰이 없거나 유효하지 않은 경우 401 Unauthorized 반환
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰없쩡");
        }
    }
}
