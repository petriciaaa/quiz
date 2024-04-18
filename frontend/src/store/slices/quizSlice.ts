import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IQuestion } from "types/question";

export const fetchQuizes = createAsyncThunk(
  "quiz/fetchQuizes",
  async function (_, { rejectWithValue }) {
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
    status: null | string | "loading" | "done";
    error: null | string;
  };
  randomQuiz: undefined | IQuestion;
}

const initialState: IInitialsState = {
  quizes: {
    data: [],
    status: "",
    error: null,
  },
  randomQuiz: undefined,
};

const quizSlice = createSlice({
  name: "quizes",
  initialState,
  reducers: {
    setRandomQuestion(state: typeof initialState, action) {
      //In action - number
      state.randomQuiz = state.quizes.data[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizes.pending, (state: typeof initialState) => {
        state.quizes.status = "loading";
      })
      .addCase(fetchQuizes.fulfilled, (state: typeof initialState, action) => {
        state.quizes.data = action.payload;
        state.quizes.status = "done";
      })
      .addCase(fetchQuizes.rejected, (state: typeof initialState, action) => {
        state.quizes.error = "failed";
      });
  },
});
export const { setRandomQuestion } = quizSlice.actions;

export default quizSlice.reducer;
