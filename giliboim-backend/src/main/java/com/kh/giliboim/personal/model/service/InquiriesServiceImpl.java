package com.kh.giliboim.personal.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.giliboim.personal.model.dao.InquiriesDao;
import com.kh.giliboim.personal.model.vo.Inquiry;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InquiriesServiceImpl implements InquiriesService{
	
	private final InquiriesDao dao;
	
	@Override
	public List<Inquiry> getAllInquiries(int memberNo) {
		return dao.getAllInquiries(memberNo);
	}
	
	@Override
	public Inquiry getInquiryById(int inquireNo) {
		return dao.getInquiryById(inquireNo);
	}
	

	@Override
	public int insertInquiry(Inquiry inquiry) {
		return dao.insertInquiry(inquiry);
	}

	@Override
	public int updateInquiry(Inquiry inquiry) {
		return dao.updateInquiry(inquiry);
	}

	@Override
	public int deleteInquiry(int inquireNo) {
		return dao.deleteInquiry(inquireNo);
	}



}
