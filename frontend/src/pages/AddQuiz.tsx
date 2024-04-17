import { useAppDispatch } from "hooks/redux/main";
import React, { useEffect } from "react";
import { addQuiz } from "store/slices/quizSlice";

function AddQuiz() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      addQuiz({
        // _id: 12,
        answers: [],
        correct_answer: "",
        title: "",
      })
    );
  });

  return <div>hahahha</div>;
}

export default AddQuiz;
