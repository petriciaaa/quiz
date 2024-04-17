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
export const addQuiz = createAsyncThunk(
  "quiz/addQuiz",
  async function (question: IQuestion, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`http://localhost:3000/api/questions`, {
        method: "POST",
        body: JSON.stringify(question),
      });

      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();
      dispatch(addQuestion(data));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState: any = [];

const quizSlice = createSlice({
  name: "quizes",
  initialState,
  reducers: {
    addQuestion(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizes.pending, (state: any) => {
        return [...state, { isLoading: true, error: undefined }];
      })
      .addCase(fetchQuizes.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchQuizes.rejected, (state, action) => {
        return action.payload;
      });
    // .addCase(addQuiz.pending, (state: any) => {
    //   // handle the pending stage
    //   return [...state, { isLoading: true, error: undefined }];
    // })
    // .addCase(addQuiz.fulfilled, (state, action) => {
    //   return undefined;
    // })
    // .addCase(addQuiz.rejected, (state, action) => {
    //   return undefined;
    // });
  },
});
const { addQuestion } = quizSlice.actions;

export default quizSlice.reducer;
