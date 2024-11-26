import React, { useEffect, useState } from "react";

const GunTrade = () => {
  // List of states with IT company availability
  const statesList = [
    { name: "California", hasITCompanies: true },
    { name: "Texas", hasITCompanies: true },
    { name: "Florida", hasITCompanies: false },
    { name: "New York", hasITCompanies: true },
    { name: "Nevada", hasITCompanies: false },
  ];

  const [location, setLocation] = useState(null);
  const [stateName, setStateName] = useState("");
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Function to fetch state from latitude and longitude
    const fetchLocation = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();

        const currentState = data.address.state; // Extract state name from response
        setStateName(currentState);

        // Check if the state exists and has IT companies
        const state = statesList.find(
          (state) => state.name.toLowerCase() === currentState?.toLowerCase()
        );

        setIsSearchDisabled(!(state && state.hasITCompanies));
      } catch (err) {
        setError("Unable to fetch location details.");
      }
    };

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchLocation(latitude, longitude);
        },
        () => {
          setError("Geolocation access denied.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search for IT Companies in Your State</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div>
          {stateName ? (
            <p>Your current state: <strong>{stateName}</strong></p>
          ) : (
            <p>Fetching your location...</p>
          )}
          <button disabled={isSearchDisabled}>Search</button>
        </div>
      )}
    </div>
  );
};

export default GunTrade;
