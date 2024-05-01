import React from "react";
import { Typography } from "@mui/material";

interface IResult {
  category: string | undefined;

  answers: {
    all: number | null | string;
    right: number | null | string;
    wrong: number | null | string;
  };
}

function Result({ category, answers }: IResult) {
  return (
    <div>
      {category}
      <Typography>{answers.right} -right</Typography>
      <Typography>{answers.wrong} -wrong</Typography>
      <Typography fontSize={42}>{answers.all} -all</Typography>
    </div>
  );
}

export default Result;
