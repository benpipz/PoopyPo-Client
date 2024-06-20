import React from "react";
import { Link } from "react-router-dom";
const Xicon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="26"
    viewBox="0 96 960 960"
    width="26"
  >
    <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
  </svg>
);

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {isOpen && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "-30px",
            }}
          >
            <svg
              onClick={toggleSidebar}
              xmlns="http://www.w3.org/2000/svg"
              height="26"
              viewBox="0 96 960 960"
              width="26"
            >
              <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
            </svg>
          </div>
          <ul className="sidebar2">
            <Link onClick={toggleSidebar} to="/">
              <li>Home</li>
            </Link>
            <Link onClick={toggleSidebar} to="/about">
              <li>About</li>
            </Link>
            <Link onClick={toggleSidebar} to="/login">
              <li>Login</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
