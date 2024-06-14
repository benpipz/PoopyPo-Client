import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";
import Points from "./Points";
import MapButtons from "../MapButtons";

const PoopyMap = () => {
  const [points, setPoints] = useState([]);

  const addToCurrentPoints = (newpoint) => {
    setPoints([...points, newpoint]);
  };

  return (
    <APIProvider apiKey={"AIzaSyC_IxFbNnxR5MKL8i7Y4XyPR-3LLYtGrNg"}>
      <MapButtons addPoint={addToCurrentPoints} />
      <Map
        style={{ width: "98vw", height: "80vh" }}
        defaultCenter={{ lat: 31.9608819275, lng: 34.7959617739531 }}
        defaultZoom={12}
        gestureHandling={"greedy"}
        mapId={"53511ab25062212b"}
        clickableIcons={true}
      >
        <Points points={points} />
      </Map>
    </APIProvider>
  );
};

export default PoopyMap;
