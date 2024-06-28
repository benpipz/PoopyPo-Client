import React, { useEffect, useState } from "react";
import { useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useCallback } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { InfoWindow } from "@vis.gl/react-google-maps";
import poop from "../../assets/face-base-poop.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import MyInfoWindow from "./InfoWindow";

const image = <img className="ball" src={poop} style={{ width: "30px", height: "30px" }}></img>;

const MarkerWithInfoWindow = ({
  position,
  reporter,
  title,
  content,
  askForRoute,
  currentShowing,
  setcurrentShowing,
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const handleMarkerClick = useCallback(() => {
    setcurrentShowing(position);
    setInfoWindowShown((isShown) => !isShown);
  }, []);

  useEffect(() => {
    if (currentShowing != position) {
      handleClose();
    }
  }, [currentShowing]);
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  const getRoute = () => {
    askForRoute(position);
  };
  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onClick={handleMarkerClick}
      >
        {image}
      </AdvancedMarker>
      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <MyInfoWindow
            upvotes={upvotes}
            setUpvotes={setUpvotes}
            getRoute={getRoute}
            reporter={reporter}
          />
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerWithInfoWindow;
