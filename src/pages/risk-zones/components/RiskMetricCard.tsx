import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface RiskMetricCardProps {
  title: string;
  value: number;
  change?: number;
  description: string;
  color: string;
  icon?: React.ReactNode;
}

export default function RiskMetricCard({ 
  title, 
  value, 
  change, 
  description, 
  color,
  icon 
}: RiskMetricCardProps) {
  const getTrendIcon = () => {
    if (!change) return null;
    if (change > 0) return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-green-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getChangeColor = () => {
    if (!change) return '';
    if (change > 0) return 'text-red-600';
    if (change < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color} transform transition-all duration-200 hover:scale-105`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">
              {value.toLocaleString(undefined, { maximumFractionDigits: 1 })}
            </p>
            {change && (
              <span className={`flex items-center text-sm ${getChangeColor()}`}>
                {getTrendIcon()}
                <span className="ml-1">{Math.abs(change)}%</span>
              </span>
            )}
          </div>
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
}