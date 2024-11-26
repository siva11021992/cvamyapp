import React, { useState } from "react";

const GunTrade = () => {
  // List of states with IT company availability
  const statesList = [
    { name: "California", hasITCompanies: true },
    { name: "Texas", hasITCompanies: true },
    { name: "Florida", hasITCompanies: false },
    { name: "New York", hasITCompanies: true },
    { name: "Nevada", hasITCompanies: false },
  ];

  const [search, setSearch] = useState("");
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);

  // Handle input change
  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearch(input);

    // Check if the state exists and has IT companies
    const state = statesList.find(
      (state) => state.name.toLowerCase() === input.toLowerCase()
    );

    setIsSearchDisabled(!(state && state.hasITCompanies));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search for IT Companies in States</h2>
      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        placeholder="Enter state name"
      />
      <button disabled={isSearchDisabled}>Search</button>
    </div>
  );
};

export default GunTrade;
