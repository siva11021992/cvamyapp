import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import './src/GunTrade.css';

const GunTrade = () => {
  // List of states with IT company availability
  const statesList = [
    { name: "California", hasITCompanies: true },
    { name: "Texas", hasITCompanies: true },
    { name: "Florida", hasITCompanies: false },
    { name: "New York", hasITCompanies: true },
    { name: "Nevada", hasITCompanies: false },
  ];

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [stateName, setStateName] = useState("");
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);

  // Reverse Geocode function
  const fetchLocationDetails = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      const currentState = data.address.state; // Extract state name
      setStateName(currentState);

      // Check if the state exists and has IT companies
      const state = statesList.find(
        (state) => state.name.toLowerCase() === currentState?.toLowerCase()
      );

      setIsSearchDisabled(!(state && state.hasITCompanies));
    } catch (err) {
      console.error("Failed to fetch location details:", err);
    }
  };

  // Custom component to handle map clicks
  const LocationSelector = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setSelectedLocation([lat, lng]);
        fetchLocationDetails(lat, lng); // Fetch details based on clicked location
      },
    });

    return null;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select a Location on the Map</h2>
      <MapContainer
        center={[37.7749, -122.4194]} // Default center (San Francisco)
        zoom={5}
        className="leaflet-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationSelector />
        {selectedLocation && <Marker position={selectedLocation} />}
      </MapContainer>
      <div style={{ marginTop: "20px" }}>
        {stateName ? (
          <p>Your selected state: <strong>{stateName}</strong></p>
        ) : (
          <p>Select a location to see details.</p>
        )}
        <button disabled={isSearchDisabled}>Search</button>
      </div>
    </div>
  );
};

export default GunTrade;
