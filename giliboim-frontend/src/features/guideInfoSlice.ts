import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuideInfo, initGuideInfo } from "../type/route";


const guideInfoSlicce = createSlice({

    name: "guideInfo",
    initialState: initGuideInfo,
    reducers: {
        setGuideInfo: (state, action: PayloadAction<GuideInfo>) => {
            return action.payload;
        }
    }
})

export const { setGuideInfo } = guideInfoSlicce.actions;
export default guideInfoSlicce.reducer;