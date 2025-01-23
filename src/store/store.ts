'use client'

import { configureStore } from '@reduxjs/toolkit';
import currentStateReducer from './Features/currentState/currentStateSlice';
import questionsReducer from './Features/fetchData/fetchDataSlice';

export const store = configureStore({
  reducer: {
    currentState: currentStateReducer,
    questions: questionsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;