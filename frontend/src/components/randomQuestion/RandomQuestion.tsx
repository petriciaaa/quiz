import { Checkbox } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/redux/main";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IQuestion } from "types/question";
import { findQuizById } from "utils/findQuizById";
import { getRandomInt } from "utils/getRandomInt";

function RandomQuestion() {
  //Data
  const { id } = useParams();

  const questions: IQuestion[] = useAppSelector((state) => state.quiz.quizes.data);
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null);

  const generatedQuestion: IQuestion | null = findQuizById(questions, id);

  if (generatedQuestion !== currentQuestion) {
    setCurrentQuestion(generatedQuestion);
  }
  //UI
  {
    /*      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl> */
  }
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <section className="w-full h-auto flex items-center justify-center">
      <div className="question-wrapper">
        <span className="text-xl">{currentQuestion ? currentQuestion.title : "Loading..."}</span>

        {currentQuestion
          ? currentQuestion.answers.map((ans, index) => (
              <div className="" key={getRandomInt()}>
                <Checkbox {...label} />
                {ans}
              </div>
            ))
          : null}
      </div>
    </section>
  );
}

export default RandomQuestion;
