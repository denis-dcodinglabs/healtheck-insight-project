import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';

export default function FilterPanel({ onFilterChange }) {
  const [year, setYear] = useState("2017");
  const [causeOfDeath, setCauseOfDeath] = useState('');
  const [ageRange, setAgeRange] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ year, causeOfDeath, ageRange });
  };

  useEffect(() => {
    handleFilterChange();
  }, [year, causeOfDeath, ageRange]);

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter year"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Cause of Death</label>
        <input
          type="text"
          value={causeOfDeath}
          onChange={(e) => setCauseOfDeath(e.target.value)}
          placeholder="Enter cause of death"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Age Range</label>
        <input
          type="text"
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
          placeholder="Enter age range"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        onClick={handleFilterChange}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Apply Filters
      </button>
    </div>
  );
}