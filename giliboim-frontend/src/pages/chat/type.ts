export type ChatRoom = {
    chatRoomNo: number;  // CHAT_ROOM_NO
    memberNo: number;    // 방을 만든 사용자의 MEMBER_NO
    cnt: number;         // 참여인원수 (서브쿼리에서 카운트 된 값)
    nickname: string;    // 방을 만든 사용자의 닉네임
    profile: string;
    lastMessage: string;       // 마지막 메시지 내용
    lastMessageTime: string;   // 마지막 메시지 시간 (ISO 형식의 날짜 문자열)
    unreadCount: number;       // 읽지 않은 메시지 개수
};


export type ChatMessage = {
    chatCommentNo: number; // CHAT_COMMENT_NO
    chatRoomNo: number;    // CHAT_ROOM_NO
    memberNo: number;      // MEMBER_NO
    chatText: string;      // CHAT_TEXT
    createDate: string;    // CREATE_DATE (ISO 형식의 날짜 문자열)
    nickName: string;      // NICK_NAME (JOIN 된 사용자의 닉네임)
    profile: string;       // PROFILE (JOIN 된 사용자의 프로필 이미지)
};
