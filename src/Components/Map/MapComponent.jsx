import React from "react";
import PoopyMap from "./PoopyMap";
import { useState, useEffect } from "react";

const MapComponent = () => {
  const [localLocation, setLocalLocation] = useState();
  const [permissionState, setPermissionState] = useState(false);

  const geolocationPremission = (setLocalLocation) => {
    navigator.permissions
      .query({
        name: "geolocation",
      })
      .then((permission) => {
        setPermissionState(permission.state);
        if (permission.state === "granted") {
          navigator.geolocation.getCurrentPosition((position) => {
            setLocalLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        }
      });
  };

  useEffect(() => {
    geolocationPremission(setLocalLocation);
  }, [, localLocation]);

  return (
    <div>
      <div className="app">
        {permissionState == "granted" && localLocation && (
          <PoopyMap localLocation={localLocation} />
        )}

        {permissionState == "prompt" && (
          <button
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setLocalLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                },
                (error) => {
                  geolocationPremission(setLocalLocation);
                }
              );
            }}
            className="text-white bg-gray-700 p-4 w-half font-medium rounded-lg flex align-middle gap-2 mt-5"
          >
            ask for premissions
          </button>
        )}
        {permissionState == "denied" && (
          <h3 className="text-black bg-gray-100 p-4 w-half font-bold  rounded-lg flex align-middle gap-2 mt-5 ">
            Geolocation premisson required...
          </h3>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
