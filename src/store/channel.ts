import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Channel} from "../models";

interface ChannelState {
  channels: Channel[];

  tabs: Channel[];
  tabIndex: number;
}

const initialState: ChannelState = {
  channels: [],

  tabs: [],
  tabIndex: 0,
}

const slice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, action: PayloadAction<Channel[]>) {
      state.channels = action.payload;
    },

    addTab(state, action: PayloadAction<Channel>) {
      state.tabs.push(action.payload);
    },
    switchTab(state, action: PayloadAction<number>) {
      state.tabIndex = action.payload;
    },
  },
})

export const { addTab, setChannels, switchTab } = slice.actions;

export default slice.reducer;