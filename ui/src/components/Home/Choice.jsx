import React, { useState } from "react";

const Choice = ({ selectedOption, setSelectedOption }) => {
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="options"
        className="block text-lg font-medium mb-2 text-white"
      >
        Choose an option:
      </label>
      <select
        id="options"
        value={selectedOption}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={0}> Use Case</option>
        <option value={1}>Activity</option>
        <option value={2}>Class</option>
      </select>
    </div>
  );
};

export default Choice;
