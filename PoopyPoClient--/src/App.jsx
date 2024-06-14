import React from "react";
import PoopyMap from "./Components/Map/PoopyMap";
import NavBar from "./Components/NavBar";
import "./Styles.css";

const App = () => (
  <div className="app">
    <NavBar />
    <PoopyMap />
  </div>
);

export default App;
