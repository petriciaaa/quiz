import React from "react";
import { Alert, AlertTitle, Button, Checkbox, FormGroup, FormHelperText } from "@mui/material";
import ProgressLoader from "components/ui/progress/ProgressLoader";
import { useAppDispatch, useAppSelector } from "hooks/redux/main";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteQuizById, setRandomQuestion, setRandomQuestionById } from "store/slices/quizSlice";
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
  const [userAnswer, setUserAnswer] = useState<string | number | undefined>(undefined);
  const [correct, setCorrect] = useState<boolean | undefined>(undefined);

  const handleSubmitQuestion = () => {
    if (userAnswer === undefined) {
      return;
    }
    if (!userAnswer || userAnswer !== currentQuestion?.correct_answer) {
      setCorrect(false);
      return;
    }

    setCorrect(true);
  };

  return (
    <section className="w-full h-auto flex items-center justify-center flex-col">
      <div className="question-wrapper">
        <title className="flex items-start justify-center flex-col">
          <span className="text-m">{currentQuestion.category}</span>
          <span className="text-2xl">{currentQuestion ? currentQuestion.title : "Loading..."}</span>
        </title>

        <FormGroup>
          {currentQuestion
            ? currentQuestion.answers.map((ans: any, index: number) => (
                <div key={getRandomInt()}>
                  <Checkbox
                    checked={userAnswer === ans}
                    onChange={(e) => {
                      setUserAnswer(ans);
                    }}
                  />
                  {ans}
                </div>
              ))
            : null}
        </FormGroup>
        <FormHelperText>Be careful, only unlimited attempts!</FormHelperText>
        {!correct && (
          <Button variant="contained" color="primary" onClick={handleSubmitQuestion}>
            Send
          </Button>
        )}
      </div>
      <div className="correct">
        {!correct && correct !== undefined && (
          <div className="flex items-center justigy-center">
            <Alert severity="warning" icon={false}>
              <AlertTitle>Wrong</AlertTitle>
              You can try again!
            </Alert>
            <Button
              variant="contained"
              color="primary"
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
          <div className="flex items-center justigy-center">
            <Alert severity="success">Grats.</Alert>
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
    </section>
  );
}

export default QuizItem;
