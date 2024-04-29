import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IQuestion } from "types/question";

export const fetchQuizes = createAsyncThunk(
  "quiz/fetchQuizes",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch("http://localhost:3000/api/questions");

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data = await response.json();

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchQuizById = createAsyncThunk(
  "quiz/fetchQuizById",
  async function (id: string, { rejectWithValue }) {
    try {
      const response = await fetch(`http://localhost:3000/api/questions/${id}`);

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data = await response.json();

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface IInitialsState {
  quizes: {
    data: IQuestion[];
    initialData: IQuestion[];
    status: null | string | "loading" | "done";
    error: null | string;
  };
  randomQuiz: undefined | IQuestion;
  quizStreak: number;
  categoryList: {
    [key: string]: IQuestion[];
  };
}

const initialState: IInitialsState = {
  quizes: {
    data: [],
    initialData: [],
    status: "idle",
    error: null,
  },
  randomQuiz: undefined,
  quizStreak: 0,
  categoryList: {},
};

const quizSlice = createSlice({
  name: "quizes",
  initialState,
  reducers: {
    setRandomQuestion(state: typeof initialState) {
      state.randomQuiz = state.quizes.data[Math.floor(Math.random() * state.quizes.data.length)];
    },
    setRandomQuestionById(state: typeof initialState, action) {
      state.randomQuiz = state.quizes.data.filter((quiz) => quiz._id === action.payload.id)[0];
    },
    setQuizes(state: typeof initialState, action) {
      state.quizes.data = action.payload;
      state.quizes.status = "success";
    },
    setCategoryList(state: typeof initialState) {
      state.categoryList = {};

      for (let index = 0; index < state.quizes.initialData.length; index++) {
        const element: IQuestion = state.quizes.initialData[index];
        if (!element.category) {
          element.category = "other";
        }
        if (state.categoryList[element.category]) {
          state.categoryList[element.category].push(element);
        } else {
          state.categoryList[element.category] = [element];
        }
      }

      state.categoryList["all"] = [...state.quizes.initialData];
    },
    streakQuizIncrement(state: typeof initialState) {
      if (state.quizes.data.length > 1) {
        state.quizStreak++;
      }
    },
    streakQuizRefresh(state: typeof initialState) {
      state.quizStreak = 0;
    },
    deleteQuizById(state: typeof initialState, action) {
      state.quizes.data = state.quizes.data.filter((quiz) => quiz._id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizes.pending, (state: typeof initialState) => {
        state.quizes.status = "loading";
      })
      .addCase(fetchQuizes.fulfilled, (state: typeof initialState, action) => {
        state.quizes.data = action.payload;
        state.quizes.initialData = action.payload;
        state.randomQuiz = state.quizes.data[Math.floor(Math.random() * state.quizes.data.length)];
        state.quizes.status = "success";
      })
      .addCase(fetchQuizes.rejected, (state: typeof initialState, action) => {
        state.quizes.error = "failed";
      });
  },
});
export const {
  setRandomQuestion,
  deleteQuizById,
  setRandomQuestionById,
  streakQuizIncrement,
  streakQuizRefresh,
  setCategoryList,
} = quizSlice.actions;

export default quizSlice.reducer;
