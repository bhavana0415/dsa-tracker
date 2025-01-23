import { createSlice } from "@reduxjs/toolkit";

export const currentStateSlice = createSlice({
  name: 'currentState',
  initialState: { currentMode: 'dark', isLoading: false },
  reducers: {
    setCurrentMode: (state, action) => {
      state.currentMode = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  }
});

export const { setCurrentMode, setIsLoading } = currentStateSlice.actions;

export default currentStateSlice.reducer;
