// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import MetricsGrid from './MetricsGrid';
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
    
const [allData,setAllData]=useState([])
const [filteredData,setFilteredData]=useState([])
const [selectedYear,setSelectedYear]=useState("2017")
const [selectedCause,setSelectedCause]=useState("All causes")
const [tableData,setTableData]=useState([])
const [causes,setCauses]=useState([])
  useEffect(() => {
    fetch(`https://data.cdc.gov/resource/bi63-dtpu.json?year=${selectedYear}`)
      .then(response => response.json())
      .then(data => {
        setAllData(data);
        const uniqueCauses = Array.from(new Set(data.map(x => x.cause_name))).sort();
        setCauses(uniqueCauses);
        setSelectedCause("All causes")
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [selectedYear]);
  useEffect(()=>{
    setTableData(allData.filter(x=>{return x.cause_name===selectedCause}))
  },[allData,selectedCause])
  if (error) {
    toast.error('Failed to load health data');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Health Metrics Dashboard</h1>
          </div>

          {/* Year Selection Dropdown */}
          <div className="mt-4">
            <label htmlFor="year-select" className="block text-sm font-medium text-gray-700">Select Year</label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {Array.from({ length: 2017 - 1999 + 1 }, (_, i) => 1999 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Cause Selection Dropdown */}
         
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
        <div className="mt-4">
            <label htmlFor="year-select" className="block text-sm font-medium text-gray-700">Select Year</label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {Array.from({ length: 2017 - 1999 + 1 }, (_, i) => 1999 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="cause-select" className="block text-sm font-medium text-gray-700">Select Cause</label>
            <select
              id="cause-select"
              value={selectedCause}
              onChange={(e) => setSelectedCause(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {causes.map(cause => (
                <option key={cause} value={cause}>{cause}</option>
              ))}
            </select>
          </div>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Deaths by State</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deaths</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.state}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.deaths}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;