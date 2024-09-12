import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../features/postSlice";
import memberSlice from "../features/memberSlice";
import postItemSlice from "../features/postItemSlice"
import positionSlice from "../features/positionSlice";
import courcePointSlice from "../features/courcePointSlice";
import guidePointSlice from "../features/guidePointSlice";
import guideInfoSlice from "../features/guideInfoSlice";
import isGuidedSlice from "../features/isGuidedSlice";

let store = configureStore({
    reducer: {
        post: postSlice,
        member : memberSlice,
        postItem: postItemSlice,
        position: positionSlice,
        cource: courcePointSlice,
        guidePoint: guidePointSlice,
        guideInfo: guideInfoSlice,
        isGuided : isGuidedSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>

