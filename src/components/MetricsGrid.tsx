// src/components/MetricsGrid.tsx
import React from 'react';

const MetricsGrid = ({ loading, data }) => {
  console.log('MetricsGrid data:', data); // Debugging log

  if (loading) return <div>Loading...</div>;
  if (!data || !Array.isArray(data)) return <div>No data available</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((metric, index) => (
        <div key={index} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">{metric.cause_name}</h3>
          <p>Deaths: {metric.deaths}</p>
          <p>State: {metric.state}</p>
          <p>Year: {metric.year}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;