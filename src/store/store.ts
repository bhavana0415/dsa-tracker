'use client'

import { configureStore } from '@reduxjs/toolkit';
import currentStateReducer from './Features/currentState/currentStateSlice';
import questionsReducer from './Features/fetchData/fetchDataSlice';
import timerReducer from './Features/timer/timerSlice';

export const store = configureStore({
  reducer: {
    currentState: currentStateReducer,
    questions: questionsReducer,
    timer: timerReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;