import React, { useState } from "react";
import { IQuestion } from "types/question";
import { Button, Checkbox, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/redux/main";
import { setUserProgress } from "store/slices/userSlices/userProgressSlice";

interface IQuizItemProps {
  quiz: IQuestion;
}

function QuizItem({ quiz }: IQuizItemProps) {
  //

  const dispatch = useAppDispatch();

  const userProgress = useAppSelector((state) => state.userProgress.userProgress[quiz.category]);

  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (!userAnswer) {
      return;
    }
    if (userAnswer !== quiz.correct_answer) {
      setCorrect(false);
      return;
    }
    dispatch(
      setUserProgress({
        ...userProgress,
        answers: {
          all: userProgress.answers.all ? userProgress.answers.all : 0,
          right: userProgress.answers.right + 1,
          wrong: userProgress.answers.wrong ? userProgress.answers.wrong : 0,
        },
      })
    );
    setCorrect(true);
  };

  return (
    <div className="w-auto flex flex-col items-start justify-center p-7 shadow-xl">
      <Typography className="">{quiz.title} </Typography>
      {quiz.answers.map((answer: string, index: number) => {
        return (
          <>
            <div className="flex items-center justify-center">
              <Checkbox
                checked={userAnswer === answer}
                onChange={() => setUserAnswer(answer)}
                key={index}
              />
              {answer}
            </div>
          </>
        );
      })}

      <Button variant="contained" onClick={handleSubmit}>
        {" "}
        approve
      </Button>
    </div>
  );
}

export default QuizItem;
