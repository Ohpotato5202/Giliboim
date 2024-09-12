package com.kh.giliboim.config;

import java.time.Duration;
import java.util.function.Function;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ReactorResourceFactory;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import reactor.netty.http.client.HttpClient;


@Configuration
public class WebClientConfig {
    
    // Reactor Netty의 리소스를 관리하는 Factory Bean을 정의합니다.
    @Bean
    public ReactorResourceFactory resourceFactory() {
        ReactorResourceFactory factory = new ReactorResourceFactory();
        factory.setUseGlobalResources(false); // 전역 리소스 사용을 비활성화합니다.
        return factory; 
    }
    
    
    // WebClient를 설정하고 Bean으로 등록합니다.
    @Bean 
    public WebClient webClient() {
            
        // HttpClient를 설정하는 함수 정의 (연결 시간 및 타임아웃 설정)
        Function<HttpClient, HttpClient> mapper = 
                client -> HttpClient
                        .create()
                        .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000) // 연결 타임아웃 설정 (10초)
                        .doOnConnected(
                        connection -> connection.addHandlerLast(new ReadTimeoutHandler(10)) // 읽기 타임아웃 설정 (10초)
                                                .addHandlerLast(new WriteTimeoutHandler(10)) // 쓰기 타임아웃 설정 (10초)
                        )
                        .responseTimeout(Duration.ofSeconds(1)); // 응답 타임아웃 설정 (1초)
        
        // WebClient를 빌더 패턴을 사용해 생성하고 설정된 HttpClient를 연결합니다.
        return WebClient
                    .builder()
                    .clientConnector(
                            new ReactorClientHttpConnector(resourceFactory(), mapper) // 커넥터에 설정된 리소스와 HttpClient 적용
                        )
                    .build();
        // 메뉴얼대로 사용한 것으로, 코드를 이해하기 어렵다면
        // 공식 문서를 참고하세요: https://docs.spring.io/spring-framework/reference/web/webflux-webclient.html
    }
    
    
}
