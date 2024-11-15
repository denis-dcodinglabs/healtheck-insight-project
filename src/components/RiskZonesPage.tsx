import React, { useEffect, useState } from 'react';
import { fetchWorldBankData, CountryData } from '../services/worldBankApi';
import { 
  BarChart, 
  Map, 
  Heart, 
  DollarSign, 
  AlertTriangle,
  Activity,
  TrendingUp,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';
import RiskMetricCard from './RiskMetricCard';
import RiskChart from './RiskChart';

export default function RiskZonesPage() {
  const [data, setData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'health' | 'economic'>('health');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const worldData = await fetchWorldBankData();
      setData(worldData.sort((a, b) => 
        selectedMetric === 'health' 
          ? getHealthRiskScore(b) - getHealthRiskScore(a)
          : getEconomicRiskScore(b) - getEconomicRiskScore(a)
      ));
    } catch (error) {
      toast.error('Failed to load risk zone data');
    } finally {
      setLoading(false);
    }
  };

  const getHealthRiskScore = (country: CountryData) => {
    const healthScore = (
      (100 - country.lifeExpectancy) * 0.4 +
      (country.maternalMortality / 1000) * 0.6
    );
    return Math.min(Math.max(healthScore, 0), 100);
  };

  const getEconomicRiskScore = (country: CountryData) => {
    const maxGdp = Math.max(...data.map(c => c.gdpPerCapita));
    const economicScore = (
      ((maxGdp - country.gdpPerCapita) / maxGdp) * 0.6 +
      ((10 - country.healthExpenditure) / 10) * 0.4
    ) * 100;
    return Math.min(Math.max(economicScore, 0), 100);
  };

  const getRiskChartData = () => ({
    labels: data.slice(0, 10).map(country => country.name),
    datasets: [
      {
        label: selectedMetric === 'health' ? 'Health Risk Score' : 'Economic Risk Score',
        data: data.slice(0, 10).map(country => 
          selectedMetric === 'health' 
            ? getHealthRiskScore(country) 
            : getEconomicRiskScore(country)
        ),
        backgroundColor: selectedMetric === 'health' 
          ? 'rgba(239, 68, 68, 0.8)'
          : 'rgba(59, 130, 246, 0.8)',
        borderRadius: 6,
      }
    ]
  });

  const getDistributionData = () => {
    const riskScores = data.map(country => 
      selectedMetric === 'health' 
        ? getHealthRiskScore(country) 
        : getEconomicRiskScore(country)
    );

    const ranges = ['0-20', '21-40', '41-60', '61-80', '81-100'];
    const distribution = ranges.map(range => {
      const [min, max] = range.split('-').map(Number);
      return riskScores.filter(score => score >= min && score <= max).length;
    });

    return {
      labels: ranges,
      datasets: [{
        label: 'Number of Countries',
        data: distribution,
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(153, 27, 27, 0.8)',
        ],
        borderRadius: 6,
      }]
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map(i => (
              <div key={i} className="h-96 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const averageHealthRisk = data.reduce((acc, country) => acc + getHealthRiskScore(country), 0) / data.length;
  const averageEconomicRisk = data.reduce((acc, country) => acc + getEconomicRiskScore(country), 0) / data.length;
  const highRiskCount = data.filter(country => 
    getHealthRiskScore(country) > 60 || getEconomicRiskScore(country) > 60
  ).length;
  const criticalRiskCount = data.filter(country => 
    getHealthRiskScore(country) > 80 || getEconomicRiskScore(country) > 80
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Health and Economic Risk Zones</h1>
            <p className="text-gray-600 mt-2">Comprehensive analysis of global health and economic risks</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedMetric('health');
                loadData();
              }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                selectedMetric === 'health' 
                  ? 'bg-red-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Heart className="w-4 h-4" />
              Health Risk
            </button>
            <button
              onClick={() => {
                setSelectedMetric('economic');
                loadData();
              }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                selectedMetric === 'economic' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Economic Risk
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <RiskMetricCard
            title="Average Risk Score"
            value={selectedMetric === 'health' ? averageHealthRisk : averageEconomicRisk}
            change={2.5}
            description={`Global average ${selectedMetric} risk score`}
            color={selectedMetric === 'health' ? 'border-red-500' : 'border-blue-500'}
            icon={<Activity className="w-6 h-6" />}
          />
          <RiskMetricCard
            title="High Risk Regions"
            value={highRiskCount}
            description="Countries with risk score above 60%"
            color="border-orange-500"
            icon={<AlertTriangle className="w-6 h-6" />}
          />
          <RiskMetricCard
            title="Critical Risk Zones"
            value={criticalRiskCount}
            description="Countries with risk score above 80%"
            color="border-red-700"
            icon={<Map className="w-6 h-6" />}
          />
          <RiskMetricCard
            title="Total Countries"
            value={data.length}
            description="Number of countries analyzed"
            color="border-indigo-500"
            icon={<Users className="w-6 h-6" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <RiskChart
              data={getRiskChartData()}
              title={`Top 10 Countries by ${selectedMetric === 'health' ? 'Health' : 'Economic'} Risk`}
            />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <RiskChart
              data={getDistributionData()}
              title="Risk Score Distribution"
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Number of Countries'
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Detailed Risk Analysis</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Health Risk Score
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Economic Risk Score
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Life Expectancy
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GDP per Capita
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.slice(0, 10).map((country) => (
                  <tr key={country.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {country.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getHealthRiskScore(country).toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getEconomicRiskScore(country).toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {country.lifeExpectancy.toFixed(1)} years
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${country.gdpPerCapita.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}