const Random = (minRange, maxRange) => {
  const min = Math.ceil(minRange);
  const max = Math.floor(maxRange);
  return Math.random() * (max - min + 1) + min;
};

export const RandonPoopLocationRishonLetsion = () => {
  const minLat = 31.95;
  const maxLat = 31.99;
  const minLng = 34.75;
  const maxLng = 34.83;

  const lat = Math.random() * (maxLat - minLat) + minLat;
  const lng = Math.random() * (maxLng - minLng) + minLng;

  const key = JSON.stringify({ lat, lng }).toString();
  return { key: key, lat: lat, lng: lng };
};


export const RetreiveLocalLocation = (setLocalLocation) => {
  navigator.geolocation.getCurrentPosition((position) => {
    setLocalLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  });
}