import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initPost, Post } from "../type/post";


const postSlice = createSlice({
    name: "post",
    initialState: initPost,
    reducers: {
        setPost: (state, action : PayloadAction<Post>) => {
            return action.payload;
        }, 
        resetPost: () => {
            return initPost;
        }
    }
})

export const { setPost, resetPost } = postSlice.actions;

export default postSlice.reducer;
