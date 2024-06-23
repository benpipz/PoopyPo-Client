import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { randomLocation } from "../Logic/PoopyMapLogic";
import "../Styles.css";
import Poopy from "../assets/poopEmojy.png";
import Poopy2 from "../assets/poopyEmojy2.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";
import { useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";

const buttonStyle = {
  margin: "0 10px", // Adds space between the buttons
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
const MapButtons = ({ addPoint, location, lastPoint }) => {
  const map = useMap();
  const [user, loading] = useAuthState(auth);
  const [buttonInfo, setButtonInfo] = useState(true);

  useEffect(() => {
    map.setCenter(lastPoint);
  }, [lastPoint, map]);

  useEffect(() => {
    setTimeout(() => {
      setButtonInfo(false);
    }, 5000);
  }, []);
  const makeRealPoint = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const key = JSON.stringify(
        position.coords.latitude,
        position.coords.longitude
      );

      let point = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        key: key,
        user: user ? user.displayName : "Anonymous",
      };
      addPoint(point);
    });
  };

  const makeRandomPoint = () => {
    addPoint(
      randomLocation(
        location.lat,
        location.lng,
        user ? user.displayName : "Anonymous"
      )
    );
  };

  return (
    <div className="buttons">
      {buttonInfo && <h2 className="button-text">Poop your location</h2>}
      <img
        src={Poopy}
        style={{
          width: "60px",
          height: "60px",
          marginLeft: "",
          marginBottom: "15px",
        }}
        className="emojyButton"
        alt="poopy"
        onClick={makeRealPoint}
      />
      {buttonInfo && <h2 className="button-text">Poop random location</h2>}

      <img
        src={Poopy2}
        style={{ width: "60px", height: "60px", marginLeft: "" }}
        alt="poopy"
        onClick={makeRandomPoint}
      />
      {/* <button className="btn btn-primary" onClick={makeRealPoint}>
        GPS
      </button>
      <button className="btn btn-secondary" onClick={makeRandomPoint}>
        Random
      </button> */}
    </div>
  );
};

export default MapButtons;
