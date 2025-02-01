import { createSlice } from "@reduxjs/toolkit";

const getInitialMode = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") || "light";
  }
  return "light";
};

export const currentStateSlice = createSlice({
  name: 'currentState',
  initialState: { currentMode: getInitialMode(), isLoading: false },
  reducers: {
    setCurrentMode: (state, action) => {
      state.currentMode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
      }
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setCurrentMode, setIsLoading } = currentStateSlice.actions;

export default currentStateSlice.reducer;
