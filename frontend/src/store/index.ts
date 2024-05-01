import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./slices/quizSlice";
import userProgressReducer from "./slices/userSlices/userProgressSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    userProgress: userProgressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
