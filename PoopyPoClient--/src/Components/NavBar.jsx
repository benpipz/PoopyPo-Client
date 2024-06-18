import React from "react";
import Icon3 from "./../assets/poopyDog.png";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../Styles.css";

const NavBar = ({ toggleSidebar }) => {
  return (
    <nav>
      <img src={Icon3} style={{ width: "50px", height: "50px" }} alt="logo" />
      <h4 style={{ fontFamily: "Trebuchet MS " }}>Poopypo</h4>
      <ul>
        <Link to="/">
          <li class="hideOnMobile">Home</li>
        </Link>
        <Link to="/about">
          <li class="hideOnMobile">About</li>
        </Link>
        <Link to="/login">
          <li class="hideOnMobile">Login</li>
        </Link>
        <li class="menu-button">
          <svg
            onClick={toggleSidebar}
            xmlns="http://www.w3.org/2000/svg"
            height="26"
            viewBox="0 96 960 960"
            width="26"
          >
            <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
          </svg>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
