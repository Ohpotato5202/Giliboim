// src/types/Chat.ts
export interface ChatRoom {
    id: number;
    name: string;
}

export interface ChatComment {
    chatCommentNo: number;
    chatRoomNo: number;
    memberNo: number;
    chatText: string;
    createDate: string; // ISO 형식의 날짜 문자열
}
