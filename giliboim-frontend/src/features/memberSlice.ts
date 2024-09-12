import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initMember, Member } from '../type/user';


const memberSlice = createSlice({
  name: 'user',
  initialState : initMember,
  reducers: {
    setMember: (state, action: PayloadAction<Member>) => {
      return action.payload;
    },
    resetMember: (state) => {
      return initMember
    },
  },
});

export const { setMember, resetMember } = memberSlice.actions;

export default memberSlice.reducer;
