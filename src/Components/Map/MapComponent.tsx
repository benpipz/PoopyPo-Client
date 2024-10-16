import React, { FC } from "react";
import PoopyMap from "./PoopyMap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocalLocation, setInitialPoints } from "../../store/mapSlice";
import axios from "axios";

const MapComponent: FC<any> = () => {
  const [permissionState, setPermissionState] = useState<any>(false);
  const localLocation = useSelector<any>((state) => state.map.localLocation);
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
    const getPointsFromServer = async () => {
      const result = await axios.get("https://localhost:7236/api/points");
      if (result.status == 200) {
        dispatch(setInitialPoints(result.data));
      }
    };
    getPointsFromServer();
  }, []);

  useEffect(() => {
    geolocationPremission();
  }, []);

  return (
    <div>
      <div className="app">
        {localLocation != undefined && <PoopyMap />}

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
            Click me for the map
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
