package com.kh.giliboim.personal.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.giliboim.jwt.JwtProvider;
import com.kh.giliboim.personal.model.service.InquiriesService;
import com.kh.giliboim.personal.model.vo.Inquiry;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/inquiries")
public class InquiriesController {
	
	private final InquiriesService InquiriesService;
	private final JwtProvider provider;
	
	  	@GetMapping("/list")
	  	public List<Inquiry> getAllInquiries(HttpServletRequest request) {
	  		String token = provider.resolveToken(request);
	  		int memberNo = provider.getTokenMemberNo(token);
	  		log.debug("memberNo {}", memberNo);
	  		
	  		return InquiriesService.getAllInquiries(memberNo);
	  	}

	    @GetMapping("/{id}")
	    public Inquiry getInquiryById(@PathVariable("id") int inquireNo) {
	    	
	    	log.info("id {}", inquireNo);
	        return InquiriesService.getInquiryById(inquireNo);
	    }

	    @PostMapping("/AskPage")
	    public Map<String, Object> insertInquiry(@RequestBody Inquiry inquiry, HttpServletRequest request) {
	    	
	    	Map<String, Object> map = new HashMap<>();
	  		String token = provider.resolveToken(request);
	  		int memberNo = provider.getTokenMemberNo(token);
	  		
	  		log.debug("memberNo {}", memberNo);
	    	inquiry.setMemberNo(memberNo); 
	  		
	    	int result = InquiriesService.insertInquiry(inquiry);
	    	
	    	if(result > 0) {
	    		map.put("msg", "문의를 등록했습니다.");
	    		map.put("inquireNo", inquiry.getInquireNo());
	    	} else {
	    		map.put("msg", "문의 등록에 실패했습니다.");
	    	}
	    	return map;
	    }

	    @PutMapping("/{id}")
	    public Map<String, Object> updateInquiry(@PathVariable("id") int inquireNo, @RequestBody Inquiry inquiry) {
	    	
	        Map<String, Object> map = new HashMap<>();
	        inquiry.setMemberNo(1); // 로그인한 사용자의 번호를 설정(로그인 기능 구현되면 변경예정)
	    	
	    	int result = InquiriesService.updateInquiry(inquiry);
	    	if(result > 0) {
	    		map.put("msg", "문의를 수정했습니다.");
	    		map.put("inquireNo", inquireNo);
	    	} else {
	    		map.put("msg", "문의 수정에 실패했습니다.");
	    	}
	    	return map;
	    }

	    @DeleteMapping("/{id}")
	    public Map<String, Object> deleteInquiry(@PathVariable("id") int inquireNo) {
	    	
	    	Map<String, Object> map = new HashMap<>();
	    	
	    	int result = InquiriesService.deleteInquiry(inquireNo);
	    	
	    	if(result > 0 ){
	    		map.put("msg", "삭제 되었습니다.");
	    		map.put("inquireNo", inquireNo);
	    	}else{
	    		map.put("msg", "삭제 실패 되었습니다.");
	    	}
	    	return map;
	    }
}
