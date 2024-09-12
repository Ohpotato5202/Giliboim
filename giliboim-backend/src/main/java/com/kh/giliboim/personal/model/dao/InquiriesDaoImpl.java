package com.kh.giliboim.personal.model.dao;

import com.kh.giliboim.personal.model.vo.Inquiry;

import lombok.RequiredArgsConstructor;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class InquiriesDaoImpl implements InquiriesDao {

    private final SqlSession session;

    @Override
    public List<Inquiry> getAllInquiries(int memberNo) {
        return session.selectList("inquiry.getAllInquiries",memberNo);
    }

    @Override
    public Inquiry getInquiryById(int inquireNo) {
        return session.selectOne("inquiry.getInquiryById", inquireNo );
    }

    @Override
    public int insertInquiry(Inquiry inquiry) {
       return session.insert("inquiry.insertInquiry", inquiry);
    }

    @Override
    public int updateInquiry(Inquiry inquiry) {
        return session.update("inquiry.updateInquiry", inquiry);
    }

	@Override
	public int deleteInquiry(int inquireNo) {
		return session.delete("inquiry.deleteInquiry", inquireNo);
	}



 
}
