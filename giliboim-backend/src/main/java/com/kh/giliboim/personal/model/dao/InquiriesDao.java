package com.kh.giliboim.personal.model.dao;

import java.util.List;

import com.kh.giliboim.personal.model.vo.Inquiry;

public interface InquiriesDao {

	
	List<Inquiry> getAllInquiries(int memberNo);
	
    Inquiry getInquiryById(int inquireNo);
    
    int insertInquiry(Inquiry inquiry);
    
    int updateInquiry(Inquiry inquiry);
    
    int deleteInquiry(int inquireNo);
}
