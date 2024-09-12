import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initIsGuided, isGuided } from "../type/route";


const isGuidedSlice = createSlice({
    
    name: "isGuided",
    initialState: initIsGuided,
    reducers: {
        onGuided: (state) => {
            return true;
        },
        offGuided: (state) => {
            return false;
        }
    }
    
})

export const { onGuided, offGuided } = isGuidedSlice.actions;
export default isGuidedSlice.reducer;