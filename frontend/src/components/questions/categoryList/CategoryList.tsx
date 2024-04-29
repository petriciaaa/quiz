import { useAppDispatch, useAppSelector } from "hooks/redux/main";
import React, { useEffect, useState } from "react";
import { setCategoryList } from "store/slices/quizSlice";
import ListItemMemo from "./items/ListItem";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

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
    <div className="">
      Category list
      {category.map((category, index) => {
        return (
          <>
            <section className="my-2  flex flex-start justify-start">
              <ListItemMemo category={category} quizes={list[category]} />

              <NavLink to={`/quiz/${category}`} className={`ml-2`}>
                {" "}
                <Button variant={index % 2 === 0 ? "contained" : "outlined"} size="medium">
                  Go quiz to {category}
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
