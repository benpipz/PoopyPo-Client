import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { randomLocation } from "../Logic/PoopyMapLogic";
import "../Styles.css";
import Poopy from "../assets/poopEmojy.png";
import Poopy2 from "../assets/poopyEmojy2.png";
import ResetLocationLogo from "../assets/ResetLocationLogo.png";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";
import { useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { useDispatch, useSelector } from "react-redux";
import { addPointToStore, resetLocation } from "../store/mapSlice";
import axios from "axios";
const MapButtons = ({}) => {
  const map = useMap();
  const [user, loading] = useAuthState(auth);
  const [buttonInfo, setButtonInfo] = useState(true);
  const lastPoint = useSelector((state) => state.map.lastPoint);
  const location = useSelector((state) => state.map.localLocation);

  const dispatch = useDispatch();

  useEffect(() => {
    if (lastPoint && map) {
      map.setCenter(lastPoint);
    }
  }, [lastPoint, map]);

  useEffect(() => {
    setTimeout(() => {
      setButtonInfo(false);
    }, 5000);
  }, []);

  const makeRealPoint = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
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
      var newPoint = {
        Latitude: point.lat,
        Longitude: point.lng,
        Uid: "1ff06079-8c96-4fd0-e474-08dc9dd2efa1",
      };
      const reuslt = await axios.post(
        "https://localhost:7236/api/points",
        newPoint
      );
      console.log(reuslt);
      dispatch(addPointToStore(point));
    });
  };

  const onResetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let point = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      dispatch(resetLocation(point));
    });
  };

  const makeRandomPoint = () => {
    const point = randomLocation(
      location.lat,
      location.lng,
      user ? user.displayName : "Anonymous"
    );
    dispatch(addPointToStore(point));
  };

  return (
    <div className="buttons">
      {buttonInfo && <h2 className="button-text">Reset Location</h2>}
      <img
        src={ResetLocationLogo}
        style={{ width: "60px", height: "60px", marginBottom: "5px" }}
        alt="poopy"
        onClick={onResetLocation}
      />
      {buttonInfo && <h2 className="button-text">Poop your location</h2>}
      <img
        src={Poopy}
        style={{
          width: "60px",
          height: "60px",
          marginBottom: "15px",
        }}
        alt="poopy"
        onClick={makeRealPoint}
      />
      {buttonInfo && <h2 className="button-text">Poop random location</h2>}
      <img
        src={Poopy2}
        style={{ width: "60px", height: "60px" }}
        alt="poopy"
        onClick={makeRandomPoint}
      />
    </div>
  );
};

export default MapButtons;
