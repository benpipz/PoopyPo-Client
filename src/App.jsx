import React from "react";
import PoopyMap from "./Components/Map/PoopyMap";
import NavBar from "./Components/NavBar";
import "./Styles.css";
import Sidebar from "./Components/Sidebar";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import About from "./Components/About";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <NavBar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/PoopyPoClient" element={<PoopyMap />} />
          <Route path="/PoopyPoClient/about" element={<About />} />
          <Route path="/PoopyPoClient/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
