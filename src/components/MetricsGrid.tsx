import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  loading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, loading }) => {
  const getTrendIcon = () => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getChangeColor = () => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value.toLocaleString()}</p>
        <span className={`ml-2 flex items-center text-sm ${getChangeColor()}`}>
          {getTrendIcon()}
          <span className="ml-1">{Math.abs(change)}%</span>
        </span>
      </div>
    </div>
  );
};

interface MetricsGridProps {
  loading?: boolean;
  data?: {
    metrics: Array<{
      title: string;
      value: number;
      change: number;
    }>;
  };
}

export default function MetricsGrid({ loading, data }: MetricsGridProps) {
  return (
    <>
      {(data?.metrics || []).map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          loading={loading}
        />
      ))}
    </>
  );
}