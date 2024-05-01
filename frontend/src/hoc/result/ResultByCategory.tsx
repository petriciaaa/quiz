import React, { useEffect } from "react";
import Result from "../../components/questions/result/Result";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "hooks/redux/main";
import { setCategoryList } from "store/slices/quizSlice";
import { setUserProgress } from "store/slices/userSlices/userProgressSlice";
import ProgressLoader from "components/ui/progress/ProgressLoader";

function ResultByCategory() {
  //

  const { category } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userProgress = useAppSelector((state) => {
    return state.userProgress.userProgress;
  });

  const categoryResult = userProgress[category ? category : "all"];

  if (!categoryResult) {
    // navigate(-1);
    return <ProgressLoader />;
  }
  return (
    <>
      <Result
        answers={{
          all: categoryResult.answers.all,
          right: categoryResult.answers.right,
          wrong: categoryResult.answers.wrong,
        }}
        category={category}
      />
    </>
  );
}

export default ResultByCategory;
