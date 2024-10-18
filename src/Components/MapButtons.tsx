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
import { Location } from "../Types/Infra";

const MapButtons = ({}) => {
  const map = useMap();
  const [user, loading] = useAuthState(auth);
  const [buttonInfo, setButtonInfo] = useState(true);
  const lastPoint: Location = useSelector<MapSlice>(
    (state) => state.map.lastPoint
  ) as Location;
  const location: Location = useSelector<MapSlice>(
    (state) => state.map.localLocation
  ) as Location;

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
      var newPoint = {
        Latitude: position.coords.latitude,
        Longitude: position.coords.longitude,
        UserId: user?.uid,
      };
      await addPoint(newPoint);
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

  const makeRandomPoint = async () => {
    const point = randomLocation(location.lat, location.lng);
    point["UserId"] = user?.uid;

    await addPoint(point);
  };

  const addPoint = async (point) => {
    const result = await axios.post("https://localhost:7236/api/points", point);
    if (result.status === 201) {
      dispatch(addPointToStore(result.data));
    }
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
