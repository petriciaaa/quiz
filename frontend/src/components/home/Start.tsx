import { Button } from "@mui/material";
import { useAppSelector } from "hooks/redux/main";
import React, { useEffect } from "react";
import { useAppDispatch } from "./../../hooks/redux/main";
import { fetchQuizById, fetchQuizes } from "store/slices/quizSlice";
import { NavLink } from "react-router-dom";

function Start() {
  // const state = useAppSelector((state) => state.quiz);
  // console.log(state);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchQuizes());
  //   dispatch(fetchQuizById("661ea5817c6a0939f45d1334"));
  // }, [dispatch]);
  return (
    <section className="wrapper w-full h-1/2 flex items-center justify-center p-2 mt-52 ">
      {/* <div className="flex items- justify-center  "> */}
      <span className="text-3xl mr-3"> Wanna some </span>
      <NavLink to={"/quiz"}>
        {" "}
        <Button variant="contained" color="primary" size="large">
          quiz?
        </Button>{" "}
      </NavLink>
      {/* </div> */}
    </section>
  );
}

export default Start;
