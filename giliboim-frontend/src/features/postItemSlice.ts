import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initPostItem, PostItems } from "../type/post";


const postItemSlice = createSlice({
    name: "postItem",
    initialState: initPostItem, 
    reducers: {
        setPostItem: (state, action: PayloadAction<PostItems>) => {
            return action.payload;
        },
        addImages: (state, action: PayloadAction<{ images: File[], previews: string[] }>) => {
            state.images = [...state.images, ...action.payload.images];
            state.previews = [...state.previews, ...action.payload.previews];
        },
        removeImage: (state, action: PayloadAction<number>) => {
            state.images = state.images.filter((_, i) => i !== action.payload);
            state.previews = state.previews.filter((_, i) => i !== action.payload);
        },
        resetPostItem: () => {
            return initPostItem;
        }
    },
    
})

export const { setPostItem, addImages, removeImage, resetPostItem } = postItemSlice.actions;
export default postItemSlice.reducer;