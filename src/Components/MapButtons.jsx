import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { RandonPoopLocationRishonLetsion } from "../Logic/PoopyMapLogic";
import "../Styles.css";
import Poopy from "../assets/poopEmojy.png";
import Poopy2 from "../assets/poopyEmojy2.png";

const buttonStyle = {
  margin: "0 10px", // Adds space between the buttons
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
const MapButtons = ({ addPoint }) => {
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
      };
      addPoint(point);
    });
  };

  const makeRandomPoint = () => {
    addPoint(RandonPoopLocationRishonLetsion());
  };

  return (
    <div className="buttons">
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
