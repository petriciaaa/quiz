import React, { useEffect } from "react";

import { Route, Routes } from "react-router";

import Home from "pages/Home";
import Layout from "./layout/Layout";
import Quiz from "pages/Quiz";
import RandomQuize from "pages/RandomQuize";
import NotFound from "pages/NotFound";
import { fetchQuizes } from "store/slices/quizSlice";
import { useAppDispatch } from "hooks/redux/main";
import AddQuiz from "pages/AddQuiz";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchQuizes());
    console.log("app render");
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="" element={null} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/addQuestion" element={<AddQuiz />} />
          <Route path="/random/:id" element={<RandomQuize />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
