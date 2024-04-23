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
    status: null | string | "loading" | "done";
    error: null | string;
  };
  randomQuiz: undefined | IQuestion;
  categoryList: {
    all: {};
    nature: {};
    cosmic: {};
  };
}

const initialState: IInitialsState = {
  quizes: {
    data: [],
    status: "",
    error: null,
  },
  randomQuiz: undefined,
  categoryList: {
    all: {},
    nature: {},
    cosmic: {},
  },
};

const quizSlice = createSlice({
  name: "quizes",
  initialState,
  reducers: {
    setRandomQuestion(state: typeof initialState, action = { payload: 0, type: "quizes" }) {
      state.randomQuiz = state.quizes.data[action.payload];
    },
    setQuizes(state: typeof initialState, action) {
      state.quizes.data = action.payload;
      state.quizes.status = "success";
    },
    setCategoryList(state: typeof initialState, action) {
      state.categoryList.all = state.quizes;
    },
    deleteQuizById(state: typeof initialState, action) {
      state.quizes.data = state.quizes.data.filter((el) => el._id !== action.payload.id);
      state.randomQuiz = state.quizes.data[Math.floor(Math.random() * state.quizes.data.length)];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizes.pending, (state: typeof initialState) => {
        state.quizes.status = "loading";
      })
      .addCase(fetchQuizes.fulfilled, (state: typeof initialState, action) => {
        state.quizes.data = action.payload;
        state.quizes.status = "success";
      })
      .addCase(fetchQuizes.rejected, (state: typeof initialState, action) => {
        state.quizes.error = "failed";
      });
  },
});
export const { setRandomQuestion, deleteQuizById } = quizSlice.actions;

export default quizSlice.reducer;
