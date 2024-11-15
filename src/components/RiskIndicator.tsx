import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface RiskIndicatorProps {
  data?: any;
}

export default function RiskIndicator({ data }: RiskIndicatorProps) {
  const riskLevels = [
    { age: '0-18', risk: 15, color: 'bg-green-500' },
    { age: '19-35', risk: 25, color: 'bg-yellow-500' },
    { age: '36-50', risk: 45, color: 'bg-orange-500' },
    { age: '51-70', risk: 65, color: 'bg-red-500' },
    { age: '70+', risk: 85, color: 'bg-red-600' },
  ];

  return (
    <div className="space-y-4">
      {riskLevels.map((level) => (
        <div key={level.age} className="relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{level.age}</span>
            <span className="text-sm font-medium text-gray-900">{level.risk}% Risk</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${level.color}`}
              style={{ width: `${level.risk}%` }}
            ></div>
          </div>
          {level.risk >= 65 && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span>High Risk Group</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}