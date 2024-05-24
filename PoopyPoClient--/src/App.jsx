import React from 'react';
import {createRoot} from 'react-dom/client';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

const App = () => (
  <APIProvider apiKey={"AIzaSyC_IxFbNnxR5MKL8i7Y4XyPR-3LLYtGrNg"}>
    <h1>Poopypo</h1>
    <Map
      style={{width: '80vw', height: '80vh'}}
      defaultCenter={{lat: 31.96088192753824, lng:34.7959617739531}}
      defaultZoom={14}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      mapId={"53511ab25062212b"}
    >
      <Marker  position={{lat: 31.96088192753824, lng: 34.7959617739531}}/>
      </Map>
  </APIProvider>
);


export default App;
