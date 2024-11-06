import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import MetricsGrid from './MetricsGrid';
import HealthChart from './HealthChart';
import RiskIndicator from './RiskIndicator';
import FilterPanel from './FilterPanel';
import { useHealthData } from '../hooks/useHealthData';
import toast from 'react-hot-toast';

export default function DashboardLayout() {
  const { data, loading, error, refreshData } = useHealthData();

  const handleRefresh = () => {
    refreshData();
    toast.success('Data refreshed successfully');
  };

  if (error) {
    toast.error('Failed to load health data');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Health Analytics Dashboard</h1>
            <button
              onClick={handleRefresh}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </button>
          </div>
          
          <div className="mt-4 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search health metrics..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <FilterPanel />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <MetricsGrid loading={loading} data={data} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Health Trends Over Time</h3>
            <HealthChart type="line" data={data?.trends} />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Demographics Distribution</h3>
            <HealthChart type="pie" data={data?.demographics} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Risk Analysis by Age Group</h3>
          <RiskIndicator data={data?.riskFactors} />
        </div>
      </div>
    </div>
  );
}