import { createSlice } from "@reduxjs/toolkit";

export const currentStateSlice = createSlice({
  name: 'currentState',
  initialState: { currentMode: 'dark', currentHeader: 'Home', isLoading: false, checkedItems: [] },
  reducers: {
    setCurrentMode: (state, action) => {
      state.currentMode = action.payload;
    },
    setCurrentHeader: (state, action) => {
      state.currentHeader = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCheckedItems: (state, action) => {
      state.checkedItems = action.payload;
    }
  }
});

export const { setCurrentHeader, setCurrentMode, setIsLoading, setCheckedItems } = currentStateSlice.actions;

export default currentStateSlice.reducer;
