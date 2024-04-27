import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

function Start() {
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
