package com.kh.giliboim.community.model.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Report {
    private int reportNo;      // 신고 번호 (PRIMARY KEY)
    private int rcNo;          // 관련된 RC_NO (이 컬럼의 의미는 도메인에 따라 다를 수 있습니다)
    private int memberNo;      // 신고자 회원 번호
    private int postNo;        // 신고된 게시물 번호
    private int commentNo;     // 신고된 댓글 번호 (게시물 대신 댓글 신고 시)
    private String reason;     // 신고 사유
    private Date createDate;   // 신고 생성 날짜
    private String nickname;
    private String category;
}
