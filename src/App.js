import React from "react";
import Home from "./components/Home";
import { data } from "./data/structure";

const App = () => {
  //   data.levels.map((levels) => {
  //     console.log(levels);
  //   });

  // console.log(data);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Home />
    </div>
  );
};

export default App;
