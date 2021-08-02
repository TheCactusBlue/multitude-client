import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";

import channelReducer from './channel';
import popoverReducer from './popover';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    channel: channelReducer,
    user: userReducer,
    popover: popoverReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;