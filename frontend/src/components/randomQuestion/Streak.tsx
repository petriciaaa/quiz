import { Rating } from "@mui/material";
import React from "react";

interface IStreak {
  currentStreak: number;
}

function Streak({ currentStreak }: IStreak) {
  return (
    <>
      <div className="flex items-center">
        <span>Your session streak is: {currentStreak}</span>
        <Rating
          name="size-large"
          value={currentStreak}
          size="medium"
          readOnly
          max={currentStreak <= 5 ? currentStreak : 5}
        />
      </div>
    </>
  );
}
const StreakMemo = React.memo(Streak);

export default StreakMemo;
