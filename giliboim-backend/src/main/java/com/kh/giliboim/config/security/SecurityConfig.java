package com.kh.giliboim.config.security;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.kh.giliboim.account.filter.Filter;
import com.kh.giliboim.jwt.JwtProvider;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
	
	private final JwtProvider jwtProvider;
	
	 @Bean
	 public PasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	 }
	 
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http.cors(corsConfig -> corsConfig.configurationSource(new CorsConfigurationSource() {
			
			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
				CorsConfiguration config = new CorsConfiguration();
				config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
				config.setAllowedMethods(Collections.singletonList("*"));
				config.setAllowCredentials(true); //jwt사용시에만 이용가능
				config.setAllowedHeaders(Collections.singletonList("*"));
				config.setMaxAge(3600L); //캐싱시간 1시간
				
				return config;
			}
		}))
		.csrf((csrfConfig) -> csrfConfig.disable())
		.sessionManagement(config ->
			config.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		)
		.authorizeHttpRequests((authorizeRequest) -> authorizeRequest
				.requestMatchers("/Account/**").permitAll() //누구나 이용가능한 url
				.requestMatchers("/phoneVerify/**").permitAll() //누구나 이용가능한 url
				.requestMatchers("/static/**").permitAll() // api/static 경로 하위 파일에 접근
				.requestMatchers("/stompServer/**").permitAll() // WebSocket 엔드포인트 허용
				.requestMatchers("/Social/**").permitAll() // api/static 경로 하위 파일에 접근
				.requestMatchers("/admin/**").hasRole("ADMIN")
				.requestMatchers("/**").hasAnyRole("USER", "ADMIN") // 그외는 user권한 필요
				.anyRequest().authenticated()
		)
		.addFilterBefore(new Filter(jwtProvider), UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}
}
