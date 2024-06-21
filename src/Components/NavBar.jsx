import React, { useEffect } from "react";
import Icon3 from "./../assets/poopyDog.png";
import { Link } from "react-router-dom";
import "../Styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";

const NavBar = ({ toggleSidebar }) => {
  const [user, loading] = useAuthState(auth);

  return (
    <nav>
      <div style={{ display: "flex" }}>
        <img src={Icon3} style={{ width: "50px", height: "50px" }} alt="logo" />
        <h4 style={{ fontFamily: "Trebuchet MS " }}>Poopypo</h4>
      </div>
      <div className="flex">
        {user && user.photoURL && (
          <h4>
            <img
              src={user.photoURL}
              alt="Round Image"
              class="rounded-full shadow-lg w-12 h-12"
            ></img>
            Hello {user.displayName}
          </h4>
        )}
      </div>
      <ul>
        <Link to="/PoopyPoClient">
          <li class="hideOnMobile">Home</li>
        </Link>
        <Link to="/PoopyPoClient/about">
          <li class="hideOnMobile">About</li>
        </Link>
        {user ? (
          <Link to="/PoopyPoClient">
            <li onClick={() => auth.signOut()} class="hideOnMobile">
              Logout
            </li>
          </Link>
        ) : (
          <Link to="/PoopyPoClient/login">
            <li class="hideOnMobile">Login</li>
          </Link>
        )}
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
