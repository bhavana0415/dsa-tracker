'use client'

import { configureStore } from '@reduxjs/toolkit';
import currentStateReducer from './Features/currentState/currentStateSlice';

export const store = configureStore({
  reducer: {
    currentState: currentStateReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;