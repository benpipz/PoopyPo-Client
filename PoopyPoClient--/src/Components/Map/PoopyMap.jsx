import React, { useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";
import Points from "./Points";
import MapButtons from "../MapButtons";
import { RetreiveLocalLocation } from "../../Logic/PoopyMapLogic";
import Directions from "./Directions";
const initialLocation = {
  lat: 31.9608819275,
  lng: 34.7959617739531,
};
const PoopyMap = () => {
  const [points, setPoints] = useState([]);
  const [localLocation, setLocalLocation] = useState(initialLocation);
  const [askForRoute, setAskForRoute] = useState();

  const addToCurrentPoints = (newpoint) => {
    setPoints([...points, newpoint]);
  };

  const updateRoute = (location) => {
    setAskForRoute(location);
  };

  useEffect(() => {
    RetreiveLocalLocation(setLocalLocation);
  }, []);

  return (
    <div className="container2">
      <APIProvider apiKey={"AIzaSyC_IxFbNnxR5MKL8i7Y4XyPR-3LLYtGrNg"}>
        <MapButtons addPoint={addToCurrentPoints} />
        <div className="sub-div">
          <Map
            style={{ width: "100%", height: "95%" }}
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
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default PoopyMap;
