import React, { useEffect } from "react";

import { Route, Routes } from "react-router";

import Home from "pages/Home";
import Layout from "./layout/Layout";
import Quiz from "pages/Quiz";
import RandomQuize from "pages/RandomQuize";
import NotFound from "pages/NotFound";
import { fetchQuizes } from "store/slices/quizSlice";
import { useAppDispatch } from "hooks/redux/main";
import { useAppSelector } from "hooks/redux/main";
import AddQuiz from "pages/AddQuiz";
import ProgressLoader from "./ui/progress/ProgressLoader";

function App() {
  const dispatch = useAppDispatch();
  const { status, error, data } = useAppSelector((state) => state.quiz.quizes);

  useEffect(() => {
    dispatch(fetchQuizes());
  }, [dispatch]);

  if (status === "loading" || status === "") {
    return (
      <section className="w-full h-96 flex items-center justify-center">
        <ProgressLoader />
      </section>
    );
  }
  if (data) {
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
  return <div>Error: Unknown status {status}</div>;
}

export default App;
