import React, { useEffect, useState } from "react";
import { useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useCallback } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { InfoWindow } from "@vis.gl/react-google-maps";
import poop from "../../assets/face-base-poop.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import MyInfoWindow from "./InfoWindow";

const image = (
  <img
    className="ball"
    src={poop}
    style={{ width: "30px", height: "30px" }}
  ></img>
);

const MarkerWithInfoWindow = ({
  point,
  askForRoute,
  isMarkerWindowShowing,
  setisMarkerWindowShowing,
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [upvotes, setUpvotes] = useState(0);
  const handleMarkerClick = () => {
    setisMarkerWindowShowing(point.id);
  };

  const getRoute = () => {
    askForRoute({ lat: point.latitude, lng: point.longitude });
  };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: point.latitude, lng: point.longitude }}
        onClick={handleMarkerClick}
      >
        {image}
      </AdvancedMarker>
      {isMarkerWindowShowing && (
        <InfoWindow anchor={marker}>
          <MyInfoWindow point={point} getRoute={getRoute} />
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerWithInfoWindow;
