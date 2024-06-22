import React, { useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";
import Points from "./Points";
import MapButtons from "../MapButtons";
import { RetreiveLocalLocation } from "../../Logic/PoopyMapLogic";
import Directions from "./Directions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../util/firebase";
const initialLocation = {
  lat: 31.9608819275,
  lng: 34.7959617739531,
};

const overlayStyle = {
  position: "absolute",
  top: "82%",
  left: "8px",
  transform: "translateY(-50%)",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
  zIndex: 100,
};

const PoopyMap = ({ localLocation }) => {
  const [user, loading] = useAuthState(auth);
  const [points, setPoints] = useState([]);
  // const [localLocation, setLocalLocation] = useState(initialLocation);
  const [askForRoute, setAskForRoute] = useState();

  const addToCurrentPoints = (newpoint) => {
    setPoints([...points, newpoint]);
  };

  const updateRoute = (location) => {
    setAskForRoute(location);
  };

  // useEffect(() => {
  //   RetreiveLocalLocation(setLocalLocation);
  // }, []);

  return (
    <div className="container2">
      <APIProvider apiKey={"AIzaSyC_IxFbNnxR5MKL8i7Y4XyPR-3LLYtGrNg"}>
        <div className="sub-div">
          <Map
            style={{ width: "100%", height: "85vh" }}
            defaultCenter={localLocation}
            defaultZoom={14}
            gestureHandling={"greedy"}
            mapId={"53511ab25062212b"}
            fullscreenControl={false}
          >
            {askForRoute && (
              <Directions from={localLocation} to={askForRoute} />
            )}
            <Points points={points} askForRoute={updateRoute} />
            {user && (
              <div style={overlayStyle}>
                {
                  <MapButtons
                    addPoint={addToCurrentPoints}
                    location={localLocation}
                  />
                }
              </div>
            )}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default PoopyMap;
