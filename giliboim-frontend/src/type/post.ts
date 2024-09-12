import { Report } from './report'; // `Report` 타입을 정의한 파일의 경로를 지정합니다

// 게시물 이미지 타입 정의 (PostImg)
// 제보 게시글에 첨부된 이미지에 대한 정보를 담고 있습니다.
export type PostImg = {
    imageNo: number;       // 이미지 번호
    postNo: number;        // 게시물 번호 (해당 이미지가 속한 게시물의 ID)
    originalName: string;  // 원본 이미지 이름
    changeName: string;    // 변경된 이미지 이름 (서버에 저장된 이름)
}

// 여러 이미지를 담을 수 있는 배열 타입 (PostImgs)
export type PostImgs = PostImg[]; // 여러 이미지에 대한 배열 타입 정의

// 제보 게시글 타입 정의 (Post)
// 각각의 게시물에 대한 정보를 담고 있습니다.
export type Post = {
    postNo: number;        // 게시물 번호 (고유 ID)
    memberNo: number;      // 작성자 회원 번호
    roadAddress: string;   // 도로명 주소
    nickname: string;      // 작성자 닉네임
    title: string;         // 게시물 제목
    content: string;       // 게시물 내용
    createDate: string;    // 게시물 작성 날짜
    postImgs: PostImgs;    // 게시물에 첨부된 이미지 리스트
    thumbnail: string;     // 게시물의 썸네일 이미지 (대표 이미지)
    likeCount: number;     // 게시물의 좋아요 수
    commentCount: number;  // 게시물의 댓글 수
    reports: Report[];     // 신고 정보 배열
    // 필요한 경우 추가적인 필드를 여기에 추가할 수 있습니다.
}

// 제보 게시글의 초기값 (initPost)
// 새로운 게시물을 작성할 때 초기 상태로 사용됩니다.
export const initPost: Post = {
    postNo: 0,
    memberNo: 0,
    roadAddress: '',
    title: '',
    content: '',
    createDate: '',
    postImgs: [],
    thumbnail: '',
    likeCount: 0,
    commentCount: 0,
    nickname: '',
    reports: []            // 신고 정보 배열 초기값
}

// 제보 게시글의 댓글 타입 정의 (PostComment)
// 게시물에 달린 댓글에 대한 정보를 담고 있습니다.
export type PostComment = {
    pcNo: number;          // 댓글 번호 (고유 ID)
    memberNo: number;      // 작성자 회원 번호
    postNo: number;        // 게시물 번호 (댓글이 달린 게시물의 ID)
    content: string;       // 댓글 내용
    nickname: string;      // 작성자 닉네임
    profile: string;       // 작성자 프로필 이미지 URL
    reportNo?: number | null;
    createDate: string;
}

// 제보 게시글 댓글의 초기값 (initComment)
// 새로운 댓글을 작성할 때 초기 상태로 사용됩니다.
export const initComment: PostComment = {
    pcNo: 0,
    memberNo: 0,
    postNo: 0,
    content: '',
    nickname: '',
    profile: '',
    reportNo: null, // 신고 번호는 기본값으로 null
    createDate: ''
}

// 댓글 수 정보를 담고 있는 인터페이스 정의
export interface CommentCount {
    count: number;  // 댓글 총 개수
}

// 댓글 수 초기화 값
export const initCommentCount: CommentCount = {
    count: 0
};

// 여러 댓글을 담을 수 있는 배열 타입 (PostComments)
export type PostComments = PostComment[]; // 여러 댓글에 대한 배열 타입 정의

// 추가된 타입 정의 예시    
// 신고 정보를 포함하는 타입 예시
export type ExtendedPost = Post & {
    reports: Report[]; // 기존 Post 타입에 신고 정보를 포함하는 확장 타입 정의
}



// 제보 게시글 이미지, 프리뷰 타입 및 초기값(전역으로 관리하기 위함)

export type PostItems = {
    images: File[], 
    previews : string[], 
}

export const initPostItem: PostItems = {
    images: [], 
    previews : []
}