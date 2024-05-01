import { useAppDispatch, useAppSelector } from "hooks/redux/main";
import React, { useEffect, useState } from "react";
import { setCategoryList } from "store/slices/quizSlice";
import ListItemMemo from "../items/ListItem";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { setUserProgress } from "store/slices/userSlices/userProgressSlice";

function CategoryList() {
  //
  const { data } = useAppSelector((state) => state.quiz.quizes);
  const dispatch = useAppDispatch();

  const list = useAppSelector((state) => state.quiz.categoryList);
  const userProgress = useAppSelector((state) => state.userProgress.userProgress);
  const category = [];

  for (let key in list) {
    category.push(key);
  }

  useEffect(() => {
    dispatch(setCategoryList());
  }, [dispatch]);

  const handler = (category: string) => {
    if (!userProgress[category] || !userProgress) {
      dispatch(
        setUserProgress({
          category: category,
          isTimeExpire: false,
          answers: {
            all: list[category].length,
            right: 0,
            wrong: 0,
          },
        })
      );
    }
  };
  return (
    <div className="">
      Category list
      {category.map((category, index) => {
        return (
          <>
            <section className="my-2  flex flex-start justify-start p-2">
              <ListItemMemo category={category} quizes={list[category]} />

              <NavLink to={`/quiz/${category}`} className={`ml-2`}>
                {" "}
                <Button
                  variant={index % 2 === 0 ? "contained" : "outlined"}
                  size="small"
                  onClick={() => {
                    handler(category);
                  }}
                >
                  {category}
                </Button>
              </NavLink>
            </section>
          </>
        );
      })}
    </div>
  );
}

const CategoryListMemo = React.memo(CategoryList);
export default CategoryListMemo;
