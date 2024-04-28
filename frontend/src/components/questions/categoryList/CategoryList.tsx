import { useAppDispatch, useAppSelector } from "hooks/redux/main";
import React, { useEffect, useState } from "react";
import { setCategoryList } from "store/slices/quizSlice";
import CategoryQuiz from "components/questions/categoryList/CategoryQuiz";

function CategoryList() {
  //
  const dispatch = useAppDispatch();

  const list = useAppSelector((state) => state.quiz.categoryList);
  const category = [];

  for (let key in list) {
    category.push(key);
  }

  useEffect(() => {
    dispatch(setCategoryList());
  }, [dispatch]);

  return (
    <div>
      {category.map((category, index) => {
        return (
          <>
            <h1 className="bg-red-300">{category}</h1>d
            <CategoryQuiz category={category} quizes={list[category]} />
          </>
        );
      })}
    </div>
  );
}

const CategoryListMemo = React.memo(CategoryList);
export default CategoryListMemo;
