import { configureStore } from "@reduxjs/toolkit";
import currentStateSlice from "./Features/currentState/currentStateSlice";

const localStorageMiddleware = store => next => action => {
  const result = next(action);
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
  return result;
};

// Function to load state from localStorage
// const reHydrateStore = () => {
//   const data = localStorage.getItem('reduxState');
//   if (data) {
//     return JSON.parse(data);
//   }
//   return undefined;
// };

const reHydrateStore = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("reduxState");
    if (data) {
      return JSON.parse(data);
    }
  }
  return undefined; // Return undefined if no data or running on the server
};

export const store = configureStore({
  reducer: {
    currentState: currentStateSlice,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})

export const RootState = () => store.getState();
export const AppDispatch = store.dispatch;