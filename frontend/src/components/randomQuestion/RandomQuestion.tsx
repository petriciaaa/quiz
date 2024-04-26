import { Alert, Button, Checkbox, FormGroup, FormHelperText } from "@mui/material";
import ProgressLoader from "components/ui/progress/ProgressLoader";
import { useAppDispatch, useAppSelector } from "hooks/redux/main";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteQuizById, setRandomQuestion, setRandomQuestionById } from "store/slices/quizSlice";
import { IQuestion } from "types/question";
import { findQuizById } from "utils/findQuizById";
import { getRandomInt } from "utils/getRandomInt";

/**Короче скрытые зависимости. По handleSubmitQuestion идет удаление, */

function RandomQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { data } = useAppSelector<IQuestion | any>((state) => state.quiz.quizes);
  const rndQuestion = findQuizById(data, id);

  const [currentQuestion, setCurrentQuestion] = useState(rndQuestion);

  useEffect(() => {
    setCurrentQuestion(rndQuestion);
    return () => {};
  }, [dispatch, rndQuestion, id]);

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
    // userAnswer === currentQuestion?.correct_answer
    setCorrect(true);

    // dispatch(deleteQuizById({ id }));
  };

  if (!currentQuestion) {
    return (
      <section className="w-full h-auto  flex items-center justify-center flex-col">
        <ProgressLoader />
      </section>
    );
  }
  return (
    <section className="w-full h-auto flex items-center justify-center flex-col">
      <div className="question-wrapper">
        <span className="text-xl">{currentQuestion ? currentQuestion.title : "Loading..."}</span>
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
            <Alert severity="error">This is an error Alert.</Alert>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setUserAnswer(undefined);
                setCorrect(undefined);
              }}
            >
              Retry
            </Button>
          </div>
        )}

        {correct && (
          <div className="flex items-center justigy-center">
            <Alert severity="success">Grats.</Alert>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setUserAnswer(undefined);
                setCorrect(undefined);
                dispatch(deleteQuizById({ id }));
                dispatch(setRandomQuestion());
                // navigate(`/random/${randomQuiz?._id}`);
              }}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default RandomQuestion;
