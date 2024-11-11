import React, { useState, useEffect } from 'react';
import FilterPanel from './FilterPanel';
import HealthChart from './HealthChart';
import RiskIndicator from './RiskIndicator';
import StatisticsCard from './StatisticsCard';
import { fetchHealthIndicators } from '../services/api';

const DashboardLayout = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ year: new Date().getFullYear(), causeName: 'All Causes', state: '' });

  const getData = async () => {
    try {
      setLoading(true);
      const result = await fetchHealthIndicators(filters);
      console.log('Fetched data:', result); // Debugging log
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error); // Debugging log
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []); // Empty dependency array ensures this runs only once

  const handleFilterChange = (newFilters) => {
    console.log('New filters:', newFilters); // Debugging log
    setFilters(newFilters);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log('Data passed to components:', data); // Debugging log

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Health Metrics Dashboard</h1>
          </div>
        </header>
        <FilterPanel onFilterChange={handleFilterChange} />
        <StatisticsCard data={data?.cdc} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Life Expectancy Over Time (WHO)</h3>
            <HealthChart type="line" data={data?.who?.value.map(item => ({ label: item.TimeDim, value: item.NumericValue }))} />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Health Expenditure (% of GDP) (World Bank)</h3>
            <HealthChart type="pie" data={data?.worldBank.map(item => ({ label: item.country.value, value: item.value }))} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8" style={{ height: '400px' }}>
          <h3 className="text-lg font-semibold mb-4">Combined Insights: Mortality vs. Health Expenditure</h3>
          <HealthChart type="bar" data={data?.cdc.map(item => ({ label: item.cause_name, value: item.deaths }))} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;