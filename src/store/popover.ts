import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Channel} from "../models";

interface PopoverState {
  userPopoverId: string;
}

const initialState: PopoverState = {
  userPopoverId: '',
}

const slice = createSlice({
  name: 'popovers',
  initialState,
  reducers: {
    setUserPopover(state, action: PayloadAction<string>) {
      state.userPopoverId = action.payload;
    }
  },
})

export const { setUserPopover } = slice.actions;

export default slice.reducer;