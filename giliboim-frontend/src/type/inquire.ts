
// 문의 타입 
export type Inquire = {
    inquireNo :number,
    memberNo: number,
    title : string,
    inquireContent : string, 
    createDate : string,
    status:string, 
    answerContent : string
}

export type Inquires = Inquire[];

// 문의 초기값 

export const initInquire = {
    inquireNo :0,
    memberNo: 0, 
    title : '',
    inquireContent : '', 
    createDate : '',
    status: '',
    answerContent : ''
}


