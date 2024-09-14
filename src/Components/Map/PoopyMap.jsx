import React, { useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";
import Points from "./Points";
import MapButtons from "../MapButtons";
import Directions from "./Directions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../util/firebase";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const googleMapsApi = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const overlayStyle = {
  position: "absolute",
  top: "82%",
  left: "8px",
  transform: "translateY(-50%)",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
  zIndex: 100,
};

const PoopyMap = () => {
  const [user, loading] = useAuthState(auth);
  const [askForRoute, setAskForRoute] = useState();
  const pointsFromStore = useSelector((state) => state.map.points);
  const localLocation = useSelector((state) => state.map.localLocation);

  const updateRoute = (location) => {
    setAskForRoute(location);
  };

  return (
    <div className="container2">
      <APIProvider apiKey={googleMapsApi}>
        <div className="sub-div">
          <Map
            style={{ width: "100%", height: "85vh" }}
            defaultCenter={localLocation}
            defaultZoom={14}
            gestureHandling={"greedy"}
            mapId={"53511ab25062212b"}
            fullscreenControl={false}
          >
            <Loader />
            {askForRoute && (
              <Directions from={localLocation} to={askForRoute} />
            )}
            <Points points={pointsFromStore} askForRoute={updateRoute} />
            {user && <div style={overlayStyle}>{<MapButtons />}</div>}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default PoopyMap;
