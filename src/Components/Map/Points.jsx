import React from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { useState, useRef, useEffect } from "react";
import MarkerWithInfoWindow from "./MarkerWithInfoWindow";

const Points = ({ points, askForRoute }) => {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  // const clusterer = useRef(null);
  const [isMarkerWindowShowing, setisMarkerWindowShowing] = useState("");

  useEffect(() => {
    console.log(isMarkerWindowShowing);
  }, [isMarkerWindowShowing]);
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
              point={point}
              title={"poop"}
              content={point.key}
              key={point.id}
              askForRoute={askForRoute}
              setisMarkerWindowShowing={setisMarkerWindowShowing}
              isMarkerWindowShowing={isMarkerWindowShowing === point.id}
            />
          );
        })}
    </div>
  );
};

export default Points;
