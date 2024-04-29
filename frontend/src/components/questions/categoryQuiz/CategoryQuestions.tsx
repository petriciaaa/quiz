import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux/main";
import QuizItem from "../categoryList/items/QuizItem";
import MyTimer from "components/timer/Timer";
import { setCategoryList } from "store/slices/quizSlice";

interface ICategoryQuestionsProps {
  category: string | undefined;
}
function CategoryQuestions({ category }: ICategoryQuestionsProps) {
  //
  const dispatch = useAppDispatch();

  const categoryQuestions = useAppSelector(
    (state) => state.quiz.categoryList[category ? category : "all"]
  );
  const [error, setError] = useState<boolean | unknown>(false);

  if (!categoryQuestions) {
    try {
      dispatch(setCategoryList());
    } catch (error: unknown) {
      setError(true);
    }
  }

  const time = new Date();
  time.setSeconds(time.getSeconds() + 5); // 10 minutes time

  if (error) {
    return <span> An error occured</span>;
  }

  return (
    <>
      {categoryQuestions?.map((quiz) => {
        return <QuizItem quiz={quiz} />;
      })}
      <MyTimer expiryTimestamp={time} />
    </>
  );
}

export default CategoryQuestions;
