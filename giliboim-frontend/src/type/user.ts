export interface User {
    id: string,
    nickname: string,
    pwd: string,
    confirmPassword: string,
    name: string,
    birthdate: string,
    phone: string,
    verificationCode: string,
    memberNo: number;
}

export const defaultUser : User = {
    id: '',
    nickname: '',
    pwd: '',
    confirmPassword: '',
    name: '',
    birthdate: '',
    phone: '',
    verificationCode: '',
    memberNo : 0
} as const;

// 계정 조회용 타입 (Member)

export type Member = {

    memberNo : number; 
    authorityNo:number;
    stNo : number;
    id: string,
    phone : string, 
    pwd : string, 
    name: string,
    nickname: string,
    birthdate : string,
    enrollDate : string,
    modifyDate : string
    status : string,
    loginStatus : string,
    profile :string 

}

// 계정 조회 초기값 

export const initMember:Member = {
    memberNo : 0,
    authorityNo:0,
    stNo : 0,
    id: '',
    phone : '', 
    pwd : '',
    name: '',
    nickname: '',
    birthdate : '',
    enrollDate : '',
    modifyDate : '',
    status : '',
    loginStatus : '',
    profile : ''
}

// 계정목록 조회용 타입 (Members)
export type Members = Member[];

export const initMembers: Members = [];
