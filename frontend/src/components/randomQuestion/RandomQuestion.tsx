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

  const { data } = useAppSelector((state) => state.quiz.quizes);
  const rndQuestion = findQuizById(data, id);

  const [currentQuestion, setCurrentQuestion] = useState<any>(rndQuestion);

  // useEffect(() => {
  //   const rndQuestion = findQuizById(data, id);
  // console.log(useAppSelector((state) => state.quiz.randomQuiz?._id) == id);

  useEffect(() => {
    if (rndQuestion) {
      setCurrentQuestion(rndQuestion);
    } else {
      // setCurrentQuestion(rndQuestion);
    }
  }, [dispatch, rndQuestion, id, data]);

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
      handler={() => {
        // const rndQuestion = findQuizById(data, location.pathname.split('/')[2]);
        // setCurrentQuestion(rndQuestion);
        // navigate(`/random/${rndQuestion._id}`);
      }}
    />
  );
}

export default RandomQuestion;
