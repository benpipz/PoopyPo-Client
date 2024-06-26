import React from "react";
import PoopyMap from "./PoopyMap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocalLocation } from "../../store/mapSlice";

const MapComponent = () => {
  const [permissionState, setPermissionState] = useState(false);
  const localLocation = useSelector((state) => state.map.localLocation);
  const dispatch = useDispatch();

  const geolocationPremission = () => {
    navigator.permissions
      .query({
        name: "geolocation",
      })
      .then((permission) => {
        setPermissionState(permission.state);
        if (permission.state === "granted") {
          navigator.geolocation.getCurrentPosition((position) => {
            dispatch(
              setLocalLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              })
            );
          });
        }
      });
  };

  useEffect(() => {
    geolocationPremission();
  }, []);

  return (
    <div>
      <div className="app">
        {localLocation && <PoopyMap />}

        {permissionState == "prompt" && !localLocation && (
          <button
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  dispatch(
                    setLocalLocation({
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    })
                  );
                },
                (error) => {
                  geolocationPremission();
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
