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

  const [selectedState, setSelectedState] = useState("");
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);

  // Handle dropdown change
  const handleSelectChange = (e) => {
    const selected = e.target.value;
    setSelectedState(selected);

    // Find the selected state and check availability
    const state = statesList.find(
      (state) => state.name === selected
    );

    setIsSearchDisabled(!(state && state.hasITCompanies));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search for IT Companies in States</h2>
      <select value={selectedState} onChange={handleSelectChange}>
        <option value="" disabled>
          Select a state
        </option>
        {statesList.map((state) => (
          <option key={state.name} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>
      <button disabled={isSearchDisabled}>Search</button>
    </div>
  );
};

export default GunTrade;
