import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";
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
  const [user, loading] = useAuthState(auth);

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
            <Link onClick={toggleSidebar} to="/PoopyPoClient">
              <li>Home</li>
            </Link>
            <Link onClick={toggleSidebar} to="/PoopyPoClient/about">
              <li>About</li>
            </Link>
            {user ? (
              <Link to="/">
                <li
                  onClick={() => {
                    auth.signOut();
                    toggleSidebar();
                  }}
                  class="hideOnMobile"
                >
                  Logout
                </li>
              </Link>
            ) : (
              <Link to="/PoopyPoClient/login">
                <li onClick={toggleSidebar} class="hideOnMobile">
                  Login
                </li>
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
