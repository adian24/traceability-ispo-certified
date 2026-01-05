import { useState, useEffect } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    lat: null,
    lng: null,
    error: null,
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      error: null,
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      lat: null,
      lng: null,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });

  }, []);

  return location;
};

export default useGeoLocation;
