import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import MenuIcon from "@mui/icons-material/Menu";
import LiveSearch from "components/search/LiveSearch";
import Logo from "assets/images/logo.png";

import "./header.scss";
import { useAppSelector } from "hooks/redux/main";
import { getRandomInt } from "utils/getRandomInt";
import { useAppDispatch } from "./../../../hooks/redux/main";
import { setRandomQuestion } from "store/slices/quizSlice";
import { IQuestion } from "types/question";

function Header() {
  // const [menuOpen, setMenuOpen] = useState(false);
  // const { width = 0, height = 0 } = useWindowSize();
  // const dispatch = useAppDispatch();

  // const [randomQuiz, setRandomQuiz] = useState(useAppSelector((state) => state.quiz.randomQuiz));
  // const { status, error, data } = useAppSelector((state) => state.quiz.quizes);
  // console.log(randomQuiz);
  const [menuOpen, setMenuOpen] = useState(false);
  const { width = 0, height = 0 } = useWindowSize();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [randomQuiz, setRandomQuiz] = useState<IQuestion>();
  const { status, error, data } = useAppSelector((state) => state.quiz.quizes);

  useEffect(() => {
    dispatch(setRandomQuestion(Math.floor(Math.random() * data.length)));
  }, [location, dispatch, data]);

  const handleRandomQuizClick = () => {
    const newRandomQuizIndex = Math.floor(Math.random() * data.length);
    dispatch(setRandomQuestion(newRandomQuizIndex));
    setRandomQuiz(data[newRandomQuizIndex]);
  };

  return (
    <>
      <header className={`w-full fixed bg-white`}>
        <div
          className={`header-wrapper  ${
            width <= 550 ? "hidden" : "block"
          } flex items-center justify-between p-3 shadow-sm`}
        >
          <div className={`header__logo`}>
            <NavLink to={"/"}>
              <img src={Logo} alt="" width={52} height={52} />
            </NavLink>
          </div>

          <nav className="header__nav flex items-center justify-between relative">
            <NavLink to={"/"} className={`header__nav__element`}>
              Home
            </NavLink>
            <NavLink to={"#"} className={`header__nav__element`}>
              Quiz
            </NavLink>
            <NavLink to={"/addQuestion"} className={`header__nav__element`}>
              Add quiz
            </NavLink>
            <NavLink
              to={`${randomQuiz ? `/random/${randomQuiz._id}` : "/notFound"}`}
              className={`header__nav__element`}
              onClick={handleRandomQuizClick}
            >
              Random quiz
            </NavLink>
          </nav>

          <div className="header__search mr-10">
            <LiveSearch />
          </div>
        </div>

        <button className="xs:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <MenuIcon />
        </button>

        {menuOpen && width <= 550 && <div className="asd">asd</div>}
      </header>
    </>
  );
}

export default Header;
