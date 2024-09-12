import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  initCourcePoint, Position } from "../type/route";


const courcePointSlice = createSlice({
    name: "cource",
    initialState: initCourcePoint,
    reducers: {
        setDeparture: (state, action:PayloadAction<Position>) => {
            return {...state, departure : action.payload}
        }, 
        setDestination: (state, action:PayloadAction<Position>) => {
            return {...state , destination : action.payload}
        }, 

        resetCource: (state) => {
            return initCourcePoint;
        }
    }
})

export const { setDeparture, setDestination, resetCource } = courcePointSlice.actions;

export default courcePointSlice.reducer;