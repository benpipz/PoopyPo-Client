import React from "react";
import { InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useMap } from "@vis.gl/react-google-maps";
import { useState, useRef, useEffect } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import MarkerWithInfoWindow from "./MarkerWithInfoWindow";

const Points = ({ points }) => {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const [markerref, markererRef] = useAdvancedMarkerRef();
  const clusterer = useRef(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <div>
      {points &&
        points.map((point) => {
          return (
            <MarkerWithInfoWindow
              position={point}
              title={"poop"}
              content={point.key}
              key={point.key}
            />
          );
        })}
    </div>
  );
};

export default Points;
