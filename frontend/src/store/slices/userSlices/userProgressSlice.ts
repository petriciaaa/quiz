import { createSlice } from "@reduxjs/toolkit";

interface IInitialsState {
  userProgress: {
    [key: string]: {
      isTimeExpire: null | boolean;
      category: string;
      answers: {
        all: number;
        right: number;
        wrong: number;
      };
    };
  };
}
const initialState: IInitialsState = {
  userProgress: {},
};

const userProgress = createSlice({
  name: "userProgress",
  initialState,
  reducers: {
    setUserProgress(
      state: typeof initialState,
      action: {
        type: string;
        payload: {
          isTimeExpire: null | boolean;
          category: string;
          answers: {
            all: number;
            right: number;
            wrong: number;
          };
        };
      }
    ) {
      const userProgress = state.userProgress;
      userProgress[String(action.payload.category)] = {
        isTimeExpire: action.payload.isTimeExpire,
        category: action.payload.category,
        answers: {
          all: action.payload.answers.all,
          right: action.payload.answers.right,
          wrong: action.payload.answers.wrong,
        },
      };
    },
  },
});
export const { setUserProgress } = userProgress.actions;

export default userProgress.reducer;
