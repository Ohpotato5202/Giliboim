package com.kh.giliboim.route.controller;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.javassist.bytecode.stackmap.MapMaker;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClient.ResponseSpec;

import com.kh.giliboim.common.model.vo.PageInfo;
import com.kh.giliboim.common.template.Pagenation;
import com.kh.giliboim.route.model.vo.CourcePoint;
import com.kh.giliboim.route.model.vo.Position;

import ch.qos.logback.classic.Logger;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/route")
public class RouteController {
	
	// API 키 
	@Value("${DOROMYUNG_SEARCH_KEY}")
	private String DoromyungKey;
	
	@Value("${GEOCODER_SEARCH_KEY}")
	private String GeocoderKey;
	
	@Value("${TMAP_SEARCH_KEY}")
	private String TmapKey;
	
	
	// WebClient
	private final WebClient webClient; 
	
	// 키 + URL
	private static final String DOROMYUNG_SEARCH_URL = "https://business.juso.go.kr/addrlink/addrLinkApi.do?&resultType=json&countPerPage=5&";
	private static final String GEOCODER_SEARCH_URL="https://api.vworld.kr/req/address?service=address&version=2.0&crs=epsg:4326&format=json&type=both&zipcode=true&simple=false&";
	
	// 지번, 도로명으로 위치 좌표 검색 경로
	private static final String PARCER_SEARCH_URL = "https://api.vworld.kr/req/address?service=address&version=2.0&crs=epsg:4326&format=json&type=PARCEL&zipcode=true&simple=false&";
	private static final String ROAD_SEARCH_URL = "https://api.vworld.kr/req/address?service=address&version=2.0&crs=epsg:4326&format=json&type=ROAD&zipcode=true&simple=false&";
	
	// 티맵 보행자 경로찾기 URL 
	private static final String TMAP_SEARCH_URL = "https://apis.openapi.sk.com/tmap/routes/pedestrian";
	
	
	// 도로명 주소로 검색
	@GetMapping("/searchByName")
	public Map<String, Object> searchByName(
			@RequestParam(value = "name", required = true) String name,
			@RequestParam(value="pageNo", defaultValue = "1") int currentPage) {
		
		String requestURL = DOROMYUNG_SEARCH_URL+"confmKey="+DoromyungKey+"&keyword="+name+"&currentPage="+currentPage;
		
		
		log.debug("name {}", name);
		log.debug("requestURL {}", requestURL);
		
		
		Map<String, Object> map = getRequest(requestURL);
		
		Map<String, Object> results = (Map<String, Object>) map.get("results");
		Map<String, Object> common = (Map<String, Object>) results.get("common"); // 페이징 정보를 위한 common 데이터 가져오기 
		
		
		// 1) 전체 검색 개수 카운팅 
		log.debug("map data {}", common);
		int listCount = Integer.parseInt((String) common.get("totalCount"));
		int pageLimit = 5; // 페이지에서 보여지는 페이지의 개수 
		int searchLimit = 5; // 검색 결과의 갯수 
		
		PageInfo pi = Pagenation.getPageInfo(listCount, currentPage, pageLimit, searchLimit);
		
		// 2) 요청응답을 위한 map
		map.put("pi", pi); 
		
		log.debug("Map {}", map);
		return map;
	}
	
	// 좌표로 주소 검색 
	@GetMapping("/searchByPoint")
	public Map<String, Object> searchByPoint(
				@RequestParam(value="lng", required = true) Double lng,
				@RequestParam(value="lat", required = true) Double lat
			){
		
		String requestURL = PARCER_SEARCH_URL+"request=getAddress&key="+GeocoderKey+"&point="+lng+","+lat;
		
		log.debug("lat {}, lng {}", lat, lng);
		log.debug("requestURL {}", requestURL);
		
		Map<String, Object> map = getRequest(requestURL);
		
		log.debug("map {}", map);
		
		return map;
			
	}
	
	// 주소로 좌표 검색
	@GetMapping("/searchPointByAddress")
	public Map<String, Object> searchPointByAddress(
			@RequestParam(value = "address", required= true) String address
			){
		
		// 처음에는 도로명으로 검색하고 이후에는 지번으로 검색한다.
		String requestURL = ROAD_SEARCH_URL+"request=getCoord&key="+GeocoderKey+"&address="+address;
		
		log.debug("address {}", address);
		log.debug("requestURL {}", requestURL); 
		
		Map<String, Object> map = getRequest(requestURL);
		
		Map<String, Object> response = (Map<String, Object>) map.get("response");
		String status = (String) response.get("status"); // 페이징 정보를 위한 common 데이터 가져오기 
		
		log.debug("Before {}" , map);
		log.debug("status {}", status);
		// 지번으로 검색 
		if(status.equals("NOT_FOUND")){
			// 지번으로 재검색 하기 
			String backupRequestURL = PARCER_SEARCH_URL+"request=getCoord&key="+GeocoderKey+"&address="+address;
			map = getRequest(backupRequestURL);
			log.debug("After {}" , map);
		}
		
		
		return map;
	
	}
	
	// TMAP을 통한 보행자 경로 검색 
	@PostMapping("/tmapSearchCource")
	public Map<String, Object> tmapSearchCource (
			@RequestBody CourcePoint points
			){
		
        log.debug("points {}", points);
        
        double startY= points.getDeparture().getLat();
        double startX = points.getDeparture().getLng();
        
        double endY = points.getDestination().getLat(); // 출발지와 목적지의 위치 가져오기 
        double endX = points.getDestination().getLng();
        
         Map<String, Object> map = postRequest(TMAP_SEARCH_URL, startX, startY, endX, endY); 
       
        log.debug("postRequest {}", map);
        
        return map;
        
	}
	
	
	
	
	// 요청 경로로 GET 요청을 보내고 반환받는 함수 
	private Map<String, Object> getRequest(String url) {
	    return webClient.get()
	            .uri(url)
	            .retrieve()
	            .bodyToMono(Map.class)
	            .doOnNext(response -> log.debug("Received response : {}", response))
	            .doOnError(error -> log.debug("Error Occurred: {}", error))
	            .block(); // Mono 블로킹 해서 동기적으로 처리
	}
	
	
	
	// 요청 경로로 POST 요청을 보내고 반환받는 함수 - TMAP 경로찾기 전용
	private Map<String, Object> postRequest(String url, double startX, double startY, double endX, double endY){
	    
		// 요청 본문에 넣을 데이터를 Map으로 준비
	    Map<String, Object> requestBody = new HashMap<>();
	    requestBody.put("startX", startX);
	    requestBody.put("startY", startY);
	    requestBody.put("endX", endX);
	    requestBody.put("endY", endY);
	    requestBody.put("startName", "출발지");
	    requestBody.put("endName", "목적지");
	    log.debug("requestBody {}", requestBody);
		
	    log.debug("포스트 요청 준비 {}", url);
	    
	    
	    return webClient.post()
	    		.uri(url)
	    		.header("appKey", TmapKey)
	    		.body(BodyInserters.fromValue(requestBody))
	    		.retrieve()
	    		.bodyToMono(Map.class)
	            .doOnNext(response -> log.debug("Received response : {}", response))
	            .doOnError(error -> log.debug("Error Occurred: {}", error))
	    		.block();
	    	
	    
	}
	
}
