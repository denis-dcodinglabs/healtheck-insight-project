// @ts-nocheck
import React, { useEffect, useState } from 'react';
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
}