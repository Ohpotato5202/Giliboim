package com.kh.giliboim.personal.model.vo;

import com.kh.giliboim.community.model.vo.PostExt;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper= false)
public class InquiryExt extends Inquiry{
	private String nickname; // 문의 남긴 사용자 닉네임 
}
