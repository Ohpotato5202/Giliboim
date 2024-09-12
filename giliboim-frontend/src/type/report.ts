// 신고 타입 정의 (Report)
// 게시물이나 댓글에 대한 신고 정보를 담고 있습니다.
export type Report = {
    reportNo: number;      // 신고 번호 (고유 ID)
    rcNo: number;          // 관련된 RC 번호 (필요에 따라 변경 가능)
    memberNo: number;      // 신고자 회원 번호
    postNo: number;        // 신고된 게시물 번호
    commentNo?: number;    // 신고된 댓글 번호 (선택적, 게시물 대신 댓글 신고 시 사용)
    reason: string;        // 신고 사유
    createDate: string;    // 신고 생성 날짜
    nickname: string;      // 신고자 닉네임
    category: string;      // 신고 분류 추가
};

// 신고 초기값 (initReport)
// 새로운 신고를 작성할 때 초기 상태로 사용됩니다.
export const initReport: Report = {
    reportNo: 0,
    rcNo: 0,
    memberNo: 0,
    postNo: 0,
    reason: '',
    createDate: '',
    nickname: '',         // 초기값 추가
    category: ''          // 초기값 추가
};
