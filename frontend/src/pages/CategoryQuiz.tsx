import React from "react";
import { useParams } from "react-router";
import CategoryQuestions from "./../components/questions/categoryQuiz/CategoryQuestions";

function CategoryQuiz() {
  const { category } = useParams();

  return (
    <>
      <CategoryQuestions category={category} />
    </>
  );
}

export default CategoryQuiz;
