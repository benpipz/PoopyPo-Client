import React, { useEffect } from "react";
import Icon3 from "./../assets/poopyDog.png";
import LogoText from "./../assets/LogoText.png";

import { Link } from "react-router-dom";
import "../Styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";
import Hamburger from "./Utils/Hamburger";
import RoundImage from "./Utils/RoundImage";

const NavBar = ({ toggleSidebar }) => {
  const [user, loading] = useAuthState(auth);

  return (
    <nav>
      <div style={{ display: "flex" }}>
        <img src={Icon3} style={{ width: "50px", height: "50px" }} alt="logo" />
        <img src={LogoText} style={{ width: "150px" }} alt="logo" />
      </div>
      <div className="flex">
        {user && user.photoURL && (
          <h4>
            <RoundImage src={user.photoURL} />
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
          <Hamburger onClick={toggleSidebar} />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
