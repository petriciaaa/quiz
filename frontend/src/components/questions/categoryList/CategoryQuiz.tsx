import React from "react";
import { IQuestion } from "types/question";

interface ICategoryQuizProps {
  category: string;
  quizes: IQuestion[];
}

function CategoryQuiz({ quizes, category }: ICategoryQuizProps) {
  return (
    <div>
      {category}
      {quizes.map((quiz) => {
        return (
          <>
            <h1>{quiz._id}</h1>
            <h1>{quiz.category}</h1>
            <h1>{quiz.title}</h1>
            <h1>{quiz.correct_answer}</h1>
            <h1>{quiz.answers}</h1>
          </>
        );
      })}
    </div>
  );
}

export default CategoryQuiz;
