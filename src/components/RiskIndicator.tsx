// src/components/RiskIndicator.tsx
import React from 'react';

const RiskIndicator = ({ data }) => {
  console.log('RiskIndicator data:', data); // Debugging log

  if (!data || !Array.isArray(data)) return <div>No data available</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((risk, index) => (
        <div key={index} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">{risk.title}</h3>
          <p>Deaths: {risk.value}</p>
        </div>
      ))}
    </div>
  );
};

export default RiskIndicator;