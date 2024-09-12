import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Position, initPosition } from "../type/route";


const positionSlice = createSlice({
    name: "position",
    initialState: initPosition,
    reducers: {
        setPosition: (state, action: PayloadAction<Position>) => {
            return action.payload;
        }
    }
})


export const { setPosition } = positionSlice.actions;
export default positionSlice.reducer;

