import React, { useEffect, useState } from "react";

const LiveTracking = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    // Load GoMaps.pro API dynamically
    const script = document.createElement("script");
    script.src =
      "https://maps.gomaps.pro/maps/api/js?key=AlzaSyVzYu9WKwvbmZO_zyz-N5o966w8v8xQ83O&libraries=geometry,places&callback=initMap";
    script.async = true;
    script.defer = true;
    window.initMap = initMap; // Attach initMap to window
    document.body.appendChild(script);
  }, []);

  const initMap = () => {
    // Default location (Sydney)
    const defaultLocation = { lat: -33.8688, lng: 151.2195 };

    // Initialize the map
    const newMap = new window.google.maps.Map(document.getElementById("map"), {
      center: defaultLocation,
      zoom: 13,
    });

    const input = document.getElementById("pac-input");

    // Create autocomplete and bind to input field
    const autocomplete = new window.google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", newMap);

    // Set up event listener for place selection
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.log("No details available for the input:", place.name);
        return;
      }

      // Adjust map view based on selection
      if (place.geometry.viewport) {
        newMap.fitBounds(place.geometry.viewport);
      } else {
        newMap.setCenter(place.geometry.location);
        newMap.setZoom(17);
      }

      // Place marker at selected location
      new window.google.maps.Marker({
        position: place.geometry.location,
        map: newMap,
      });
    });

    // Set the map and start tracking
    setMap(newMap);
    trackUserLocation(newMap);
  };

  const trackUserLocation = (newMap) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Place initial marker
        const newMarker = new window.google.maps.Marker({
          position: userPosition,
          map: newMap,
          title: "Your Location",
        });

        setMarker(newMarker);
        newMap.setCenter(userPosition);

        // Update location every 10 seconds
        setInterval(() => {
          navigator.geolocation.getCurrentPosition((pos) => {
            const newPosition = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };

            newMarker.setPosition(newPosition);
            newMap.setCenter(newPosition);
          });
        }, 100000);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <div
        id="map"
        style={{
          width: "100%",
          height: "400px",
          marginTop: "10px",
        }}
      ></div>
    </div>
  );
};

export default LiveTracking;
