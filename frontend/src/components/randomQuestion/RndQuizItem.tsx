import React from "react";
import { Alert, AlertTitle, Button, Checkbox, FormGroup, FormHelperText } from "@mui/material";
import ProgressLoader from "components/ui/progress/ProgressLoader";
import { useAppDispatch, useAppSelector } from "hooks/redux/main";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteQuizById,
  setRandomQuestion,
  setRandomQuestionById,
  streakQuizIncrement,
  streakQuizRefresh,
} from "store/slices/quizSlice";
import { IQuestion } from "types/question";
import { findQuizById } from "utils/findQuizById";
import { getRandomInt } from "utils/getRandomInt";

function QuizItem({
  currentQuestion,
}: // handleRetry,
// handleNextQuestion,
// handleSend,
{
  currentQuestion: IQuestion;
  // handleRetry: () => void;
  // handleNextQuestion: () => void;
  // handleSend: () => void;
}) {
  const id = currentQuestion._id;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useAppSelector((s) => s.quiz.quizes);

  const [userAnswer, setUserAnswer] = useState<string | number | undefined | null>(undefined);
  const [correct, setCorrect] = useState<boolean | undefined>(undefined);

  const handleSubmitQuestion = () => {
    setUserAnswer(undefined);
    if (userAnswer === undefined) {
      return;
    }
    if (!userAnswer || userAnswer !== currentQuestion?.correct_answer) {
      setCorrect(false);
      dispatch(streakQuizRefresh());
      return;
    }
    // setUserAnswer(null);
    dispatch(streakQuizIncrement());
    setCorrect(true);
  };

  return (
    <section className="w-full h-auto flex items-center justify-center flex-col ">
      <div className="flex items-start justify-center flex-col  p-1">
        <div className="question-wrapper">
          <title className="flex items-start justify-center flex-col">
            <span className="text-m">
              {currentQuestion.category ? currentQuestion.category : "General"}
            </span>
            <span className="text-2xl">
              {currentQuestion.title.endsWith("?")
                ? currentQuestion.title
                : currentQuestion.title + "?"}
            </span>
          </title>

          <FormGroup>
            {currentQuestion
              ? currentQuestion.answers.map((ans: any, index: number) => (
                  <li key={getRandomInt()}>
                    <Checkbox
                      checked={userAnswer === ans}
                      onChange={(e) => {
                        // setCorrect(undefined);
                        setUserAnswer(ans);
                      }}
                    />
                    {ans}
                  </li>
                ))
              : null}
          </FormGroup>
          <FormHelperText className="py-2">Be careful, only unlimited attempts!</FormHelperText>
          {(userAnswer || (userAnswer && !correct)) && (
            <Button variant="contained" color="primary" onClick={handleSubmitQuestion}>
              send answer
            </Button>
          )}
        </div>
        <div className="feedback w-auto pt-4">
          {!correct && correct !== undefined && (
            <div className="flex items-center justify-between w-96">
              <Alert severity="warning" icon={false}>
                <AlertTitle>Wrong</AlertTitle>
                Dont be afraid, you can try again!
              </Alert>
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  setUserAnswer(undefined);
                  setCorrect(undefined);
                  // handleRetry();
                }}
              >
                Retry
              </Button>
            </div>
          )}

          {correct && (
            <div className="flex items-center justify-between  w-80">
              <Alert severity="success">You are goddamn right.</Alert>
              {data.length >= 2 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (!data || !data.length) {
                      navigate("/");
                      return;
                    }
                    setUserAnswer(undefined);
                    setCorrect(undefined);
                    dispatch(deleteQuizById({ id }));
                    dispatch(setRandomQuestion());
                    // handleNextQuestion?handleNextQuestion(): ;
                    // navigate(`/random/${randomQuiz?._id}`);
                  }}
                >
                  Next
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default QuizItem;
