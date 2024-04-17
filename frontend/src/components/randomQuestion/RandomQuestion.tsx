import { useAppSelector } from "hooks/redux/main";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IQuestion } from "types/question";
import { findQuizById } from "utils/findQuizById";

function RandomQuestion() {
  const { id } = useParams();
  const location = useLocation();
  const questions: IQuestion[] = useAppSelector((state) => state.quiz);

  const curerentQuestion: IQuestion = findQuizById(questions, id);
  console.log(curerentQuestion);

  useEffect(() => {}, [id]);

  return (
    <section className="w-full h-auto flex items-center justify-center">
      <div className="question-wrapper">
        <span className="text-xl">{curerentQuestion ? curerentQuestion.title : "Loading..."}</span>

        {curerentQuestion
          ? curerentQuestion.answers.map((ans, index) => (
              <div className="" key={index}>
                {ans}
              </div>
            ))
          : null}
      </div>
    </section>
  );
}

export default RandomQuestion;
