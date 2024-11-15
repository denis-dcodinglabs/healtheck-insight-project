import React, { ReactNode } from 'react';

interface InsightCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}

const InsightCard: React.FC<InsightCardProps> = ({ title, value, description, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {icon}
      </div>
      <div className="mt-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="ml-2 text-gray-500">{description}</span>
      </div>
    </div>
  );
};

export default InsightCard;