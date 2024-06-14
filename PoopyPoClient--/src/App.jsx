import React from "react";
import PoopyMap from "./Components/Map/PoopyMap";
import NavBar from "./Components/NavBar";

const App = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <NavBar />
    <PoopyMap />
  </div>
);

export default App;
