import React from "react";
import Home from "./components/Home";
import "./App.css";
import { data } from "./data/structure";

const App = () => {
  //   data.levels.map((levels) => {
  //     console.log(levels);
  //   });

  // console.log(data);

  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
