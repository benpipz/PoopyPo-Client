import React from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { useState, useRef, useEffect } from "react";
import MarkerWithInfoWindow from "./MarkerWithInfoWindow";

const Points = ({ points, askForRoute }) => {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  // const clusterer = useRef(null);
  const [currentShowing, setcurrentShowing] = useState();

  // useEffect(() => {
  //   if (!map) return;
  //   if (!clusterer.current) {
  //     clusterer.current = new MarkerClusterer({ map });
  //   }
  // }, [map]);

  // useEffect(() => {
  //   clusterer.current?.clearMarkers();
  //   clusterer.current?.addMarkers(Object.values(markers));
  // }, [markers]);

  // const setMarkerRef = (marker, key) => {
  //   if (marker && markers[key]) return;
  //   if (!marker && !markers[key]) return;

  //   setMarkers((prev) => {
  //     if (marker) {
  //       return { ...prev, [key]: marker };
  //     } else {
  //       const newMarkers = { ...prev };
  //       delete newMarkers[key];
  //       return newMarkers;
  //     }
  //   });
  // };

  return (
    <div>
      {points &&
        points.map((point) => {
          return (
            <MarkerWithInfoWindow
              position={point}
              reporter={point.name}
              title={"poop"}
              content={point.key}
              key={point.key}
              askForRoute={askForRoute}
              setcurrentShowing={setcurrentShowing}
              currentShowing={currentShowing}
            />
          );
        })}
    </div>
  );
};

export default Points;
