import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuidePoint, initGuidePoint, Position } from "../type/route";


const guidePointSlice = createSlice({
    name: "guidePoint", 
    initialState: initGuidePoint,
    reducers: {

        setGuidePoint: (state, action: PayloadAction<GuidePoint>) => {
            return action.payload;
        },

        // 새로 검색할시 전역 상태를 다시 initGuidePoint로 변경
        resetGuidePoint : () => {
            return;
        }
    }
})

export const { setGuidePoint, resetGuidePoint } = guidePointSlice.actions;
export default guidePointSlice.reducer; 