import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface HealthChartProps {
  type: 'line' | 'pie';
  data?: any;
}

const defaultLineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Cases',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
    },
    {
      label: 'Recoveries',
      data: [28, 48, 40, 19, 86, 27],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
    },
  ],
};

const defaultPieData = {
  labels: ['0-18', '19-35', '36-50', '51-70', '70+'],
  datasets: [
    {
      label: 'Age Distribution',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(139, 92, 246, 0.8)',
      ],
    },
  ],
};

export default function HealthChart({ type, data }: HealthChartProps) {
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const chartData = type === 'line' 
    ? (data?.datasets?.length ? data : defaultLineData)
    : (data?.datasets?.length ? data : defaultPieData);

  return (
    <div className="w-full h-[300px]">
      {type === 'line' ? (
        <Line options={lineOptions} data={chartData} />
      ) : (
        <Pie options={pieOptions} data={chartData} />
      )}
    </div>
  );
}