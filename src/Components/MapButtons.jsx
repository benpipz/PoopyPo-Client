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
import { useDispatch, useSelector } from "react-redux";
import { addPointToStore } from "../store/mapSlice";

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
      dispatch(addPointToStore(point));
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
