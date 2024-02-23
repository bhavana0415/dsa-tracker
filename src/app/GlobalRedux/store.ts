import { configureStore } from "@reduxjs/toolkit";
import fetchSliceReducer from './FetchData/fetchSlice';
export const store = configureStore({
    reducer: {
        fetchData: fetchSliceReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;