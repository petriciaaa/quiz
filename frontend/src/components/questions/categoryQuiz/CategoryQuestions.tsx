import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux/main";
import QuizItem from "../items/QuizItem";
import MyTimer from "components/timer/Timer";
import { setCategoryList } from "store/slices/quizSlice";
import Timer from "storage/timer";
import { useNavigate } from "react-router";
import { setUserProgress } from "store/slices/userSlices/userProgressSlice";

interface ICategoryQuestionsProps {
  category: string | undefined;
}
function CategoryQuestions({ category }: ICategoryQuestionsProps) {
  //

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<boolean | unknown>(false);

  const categoryQuestions = useAppSelector(
    (state) => state.quiz.categoryList[category ? category : "all"]
  );
  const userProgress = useAppSelector(
    (state) => state.userProgress.userProgress[category ? category : "all"]
  );

  const time = useMemo(() => new Date(), []);

  const [quizTime, setQuizTime] = useState(time.setSeconds(time.getSeconds() + 230));

  useEffect(() => {
    console.log(categoryQuestions);
    if (!userProgress || !categoryQuestions) {
      try {
        dispatch(setCategoryList());
        dispatch(
          setUserProgress({
            category: category ? category : "all",
            isTimeExpire: false,
            answers: {
              all: categoryQuestions.length,
              right: 0,
              wrong: 0,
            },
          })
        );
        if (categoryQuestions) {
          setQuizTime(time.setSeconds(time.getSeconds() + 210));
        }
        setError(false);
      } catch (error: unknown) {
        setError(true);
      }
    }
  }, [userProgress, categoryQuestions, dispatch, category, time]);

  const expireTime = () => {
    navigate(`/result/${category}`);
  };

  if (error) {
    return <span>An error ocurred</span>;
  }
  return (
    <section className=" w-auto">
      <MyTimer expiryTimestamp={quizTime} expireTime={expireTime} />
      <section className="w-full flex items-center justify-center flex-col p-2">
        {categoryQuestions?.map((quiz) => {
          return (
            <div className="wrapper my-4">
              <QuizItem quiz={quiz} />
            </div>
          );
        })}
      </section>
    </section>
  );
}

export default CategoryQuestions;
