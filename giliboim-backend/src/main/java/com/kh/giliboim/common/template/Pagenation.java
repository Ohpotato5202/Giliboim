package com.kh.giliboim.common.template;

import com.kh.giliboim.common.model.vo.PageInfo;

public class Pagenation {

	public static PageInfo getPageInfo(int listCount, int currentPage, int pageLimit, int boardLimit) {
		int maxPage = (int) (Math.ceil(((double) listCount / boardLimit))); // 가장 마지막 페이지
	
		int startPage = (currentPage - 1) / pageLimit * pageLimit + 1; // 시작 페이지(페이징바)
		
		int endPage = startPage + pageLimit - 1; // 마지막 페이지(페이징바)

		if (endPage > maxPage) {
			endPage = maxPage;
		}

		PageInfo pageInfo = new PageInfo(listCount, currentPage, pageLimit, boardLimit, maxPage, startPage, endPage);
		return pageInfo;
	}

}