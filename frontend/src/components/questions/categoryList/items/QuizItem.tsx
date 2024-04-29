import React from "react";
import { IQuestion } from "types/question";

interface IQuizItemProps {
  quiz: IQuestion;
}

function QuizItem({ quiz }: IQuizItemProps) {
  return (
    <div>
      {quiz.title} {quiz.answers}
    </div>
  );
}

export default QuizItem;
