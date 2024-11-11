// src/components/HealthChart.tsx
import React from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';

const HealthChart = ({ type, data }) => {
  if (!data) return <div>No data available</div>;

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Health Data',
        data: data.map(item => item.value),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      {type === 'line' && <Line data={chartData} options={chartOptions} />}
      {type === 'pie' && <Pie data={chartData} options={chartOptions} />}
      {type === 'bar' && <Bar data={chartData} options={chartOptions} />}
    </div>
  );
};

export default HealthChart;