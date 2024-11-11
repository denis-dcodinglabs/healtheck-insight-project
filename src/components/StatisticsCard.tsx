// src/components/StatisticsCard.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';

const StatisticsCard = ({ data }) => {
  if (!data || !Array.isArray(data)) return <div>No data available</div>;

  // Calculate the most common causes of death
  const causeCounts = data.reduce((acc, item) => {
    acc[item.cause_name] = (acc[item.cause_name] || 0) + 1;
    return acc;
  }, {});
  const mostCommonCauses = Object.keys(causeCounts).map(cause => ({
    label: cause,
    value: causeCounts[cause],
  }));

  // Calculate the states with the highest number of deaths
  const stateCounts = data.reduce((acc, item) => {
    acc[item.state] = (acc[item.state] || 0) + parseInt(item.deaths, 10);
    return acc;
  }, {});
  const statesWithMostDeaths = Object.keys(stateCounts).map(state => ({
    label: state,
    value: stateCounts[state],
  }));

  // Define colors for the most common causes of death
  const colors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ];

  const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ];

  const stateChartData = {
    labels: statesWithMostDeaths.map(item => item.label),
    datasets: [
      {
        label: 'Number of Deaths',
        data: statesWithMostDeaths.map(item => item.value),
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Key Statistics</h3>
      <div className="mb-8">
        <h4 className="text-md font-semibold mb-2">Most Common Causes of Death</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mostCommonCauses.map((cause, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded shadow" style={{ backgroundColor: colors[index % colors.length], borderColor: borderColors[index % borderColors.length], borderWidth: 1 }}>
              <h5 className="text-md font-semibold">{cause.label}</h5>
              <p>Occurrences: {cause.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-md font-semibold mb-2">States with Most Deaths</h4>
        <div style={{ height: '300px' }}>
          <Pie data={stateChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;