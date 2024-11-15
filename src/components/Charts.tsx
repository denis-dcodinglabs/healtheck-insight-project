import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import type { ChartData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

export const BarChart: React.FC<{ data: ChartData }> = ({ data }) => {
  return <Bar options={options} data={data} />;
};

export const LineChart: React.FC<{ data: ChartData }> = ({ data }) => {
  return <Line options={options} data={data} />;
};