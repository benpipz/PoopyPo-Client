import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { RandonPoopLocationRishonLetsion } from "../Logic/PoopyMapLogic";
import "../Styles.css";

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
    <div className="container">
      <button className="btn btn-primary" onClick={makeRealPoint}>
        Poop at my location
      </button>
      <button className="btn btn-secondary" onClick={makeRandomPoint}>
        Random geo Poop
      </button>
    </div>
  );
};

export default MapButtons;
