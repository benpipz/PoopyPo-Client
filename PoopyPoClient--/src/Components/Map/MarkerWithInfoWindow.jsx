import React, { useState } from "react";
import { useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useCallback } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { InfoWindow } from "@vis.gl/react-google-maps";
import poop from "../../assets/face-base-poop.svg";
import "bootstrap/dist/css/bootstrap.min.css";

const image = <img src={poop} style={{ width: "30px", height: "30px" }}></img>;

const MarkerWithInfoWindow = ({ position, title, content }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    []
  );

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              className="btn btn-secondary"
              onClick={() => setUpvotes(upvotes + 1)}
            >
              Vote
            </button>
            <p>upvotes: {upvotes}</p>
            <p>Reporter: Shraga Shragovitch</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerWithInfoWindow;
