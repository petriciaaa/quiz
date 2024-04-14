import Home from "pages/Home";
import React from "react";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="" element={null} />
    </Routes>
  );
}

export default App;
