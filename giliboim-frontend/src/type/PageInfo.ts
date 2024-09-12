
export type PageInfo = {
    listCount: number,
    pageNo: number,
    pageLimit: number,
    postLimit: number,

    maxPage: number,
    startPage: number,
    endPage : number
}

export const initPageInfo = {
    listCount: 0,
    pageNo: 0,
    pageLimit: 0,
    postLimit: 0,

    maxPage: 0,
    startPage: 0,
    endPage : 0
}