import QuizItem from "components/questions/quizItem/QuizItem";
import ProgressLoader from "components/ui/progress/ProgressLoader";
import { useAppDispatch, useAppSelector } from "hooks/redux/main";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { IQuestion } from "types/question";
import { findQuizById } from "utils/findQuizById";
import { getRandomInt } from "utils/getRandomInt";

/**Короче скрытые зависимости. По handleSubmitQuestion идет удаление, */

function RandomQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const [newID, setNeID] = useState<number | string | undefined>(id);

  const currentQuestion = useAppSelector((state) => state.quiz.randomQuiz);
  const { data } = useAppSelector((state) => state.quiz.quizes);
  // console.log(id, location.pathname.includes("/notfound"));

  if (id !== currentQuestion?._id && data.length) {
    navigate(`/random/${currentQuestion?._id}`);
  }
  if (location.pathname.includes("/notfound")) {
    try {
      navigate(`/random/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  if (!currentQuestion) {
    return (
      <section className="w-full h-auto  flex items-center justify-center flex-col">
        <ProgressLoader />
      </section>
    );
  }
  return (
    <QuizItem
      currentQuestion={currentQuestion}
      // handleNextQuestion={() => {

      // }}
    />
  );
}

export default RandomQuestion;
