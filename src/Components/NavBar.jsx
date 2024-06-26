import React, { useEffect, useState } from "react";
import Icon3 from "./../assets/poopyDog.png";
import LogoText from "./../assets/LogoText.png";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../Styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";
import Hamburger from "./Utils/Hamburger";
import RoundImage from "./Utils/RoundImage";

const NavBar = ({ toggleSidebar }) => {
  const [user, loading] = useAuthState(auth);
  const [userWelcome, setUserWelcome] = useState("");

  useEffect(() => {
    if (user) {
      setUserWelcome(`Hello, ${user.displayName}`);
      setTimeout(() => {
        setUserWelcome(user.displayName);
      }, 5000);
    }
  }, [user]);

  return (
    <nav>
      <div style={{ display: "flex" }}>
        <img src={Icon3} style={{ width: "50px", height: "50px" }} alt="logo" />
        <div
          style={{
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <img
            src={LogoText}
            style={{
              width: "90px",
              height: "38px",
            }}
            alt="logo"
          />
        </div>
      </div>
      <div className="flex">
        {user && user.photoURL && (
          <>
            <RoundImage src={user.photoURL} />
            <Typography
              style={{
                justifyContent: "center",
                alignContent: "center",
                padding: "10px",
              }}
            >
              {userWelcome}
            </Typography>
          </>
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
