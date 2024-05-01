import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@mui/material";
import useOutsideClick from "hooks/useOutsideClick";
import "./liveSearch.scss";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "hooks/redux/main";

function LiveSearch() {
  const data = useAppSelector((state) => state.quiz.categoryList);
  const items = [...useAppSelector((state) => state.quiz.quizes.data)];
  const [filteredItems, setFilteredItems] = useState(items);
  const [inputValue, setInputValue] = useState("");
  const [inputUsing, setInputUsing] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    if (inputValue.length === 0) {
      setFilteredItems(items);
      return;
    }
    const filteredItems = items.filter((item) =>
      item.title.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
    );
    setFilteredItems(filteredItems);
  };
  const handleOutsideClick = () => {
    setInputUsing(false);
  };

  useOutsideClick({ ref: searchRef, handler: handleOutsideClick });
  return (
    <div ref={searchRef}>
      <div className="search rounded-lg">
        <Input
          placeholder="Search..."
          disableUnderline={true}
          value={inputValue}
          // ref={inputRef}
          onChange={handleInputChange}
          onClick={() => {
            setInputUsing(true);
          }}
        />
        <Button variant="contained" color="primary">
          search
        </Button>
      </div>
      {inputUsing && (
        <ul className="search__result shadow-xl rounded-md">
          {filteredItems.map((el, index) => {
            return (
              <NavLink
                to={`/quiz/${el.category ? el.category : "all"}`}
                key={index}
                className={`search__result__element`}
              >
                {el.title}
              </NavLink>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default LiveSearch;
