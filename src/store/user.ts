import {createSlice, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers} from "@reduxjs/toolkit";

import {SimpleUser} from "../models";

interface UserState {
  user?: SimpleUser;
  accessToken: string;
}

const initialState: UserState = {
  accessToken: '',
}

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<SimpleUser>) {
      state.user = action.payload
    },
  },
})

export const { setUser } = slice.actions;

export default slice.reducer;