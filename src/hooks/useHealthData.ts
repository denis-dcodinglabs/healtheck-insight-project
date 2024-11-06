import { useState, useEffect } from 'react';
import { fetchHealthIndicators, fetchDemographicData, fetchRiskFactors } from '../services/api';
import { format } from 'date-fns';

interface HealthData {
  trends: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }>;
  };
  demographics: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string[];
    }>;
  };
  riskFactors: Array<{
    age: string;
    risk: number;
  }>;
  metrics: Array<{
    title: string;
    value: number;
    change: number;
  }>;
}

export function useHealthData() {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const processApiData = (indicators: any, demographics: any, risks: any) => {
    // Process WHO life expectancy data
    const lifeExpectancy = indicators.who.value.slice(0, 6);
    const labels = lifeExpectancy.map((item: any) => format(new Date(item.Date), 'MMM yyyy'));

    // Process demographic data
    const ageGroups = demographics.map((item: any) => ({
      age: item.age_group,
      percentage: item.value,
    }));

    // Process risk factors
    const riskData = risks.value.slice(0, 5).map((item: any) => ({
      age: item.age_group,
      risk: parseFloat(item.value),
    }));

    return {
      trends: {
        labels,
        datasets: [
          {
            label: 'Life Expectancy',
            data: lifeExpectancy.map((item: any) => item.Value),
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.5)',
          },
          {
            label: 'Health Expenditure',
            data: indicators.worldBank.map((item: any) => item.value),
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.5)',
          },
        ],
      },
      demographics: {
        labels: ageGroups.map((group: any) => group.age),
        datasets: [{
          label: 'Age Distribution',
          data: ageGroups.map((group: any) => group.percentage),
          backgroundColor: [
            'rgba(99, 102, 241, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(249, 115, 22, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(139, 92, 246, 0.8)',
          ],
        }],
      },
      riskFactors: riskData,
      metrics: [
        {
          title: 'Total Cases',
          value: indicators.cdc.reduce((acc: number, curr: any) => acc + parseInt(curr.new_case), 0),
          change: 2.5,
        },
        {
          title: 'Average Life Expectancy',
          value: Math.round(lifeExpectancy.reduce((acc: number, curr: any) => acc + curr.Value, 0) / lifeExpectancy.length),
          change: 0.8,
        },
        {
          title: 'Health Expenditure',
          value: indicators.worldBank[0]?.value || 0,
          change: -1.2,
        },
      ],
    };
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [indicators, demographics, risks] = await Promise.all([
        fetchHealthIndicators(),
        fetchDemographicData(),
        fetchRiskFactors(),
      ]);
      
      const processedData = processApiData(indicators, demographics, risks);
      setData(processedData);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    fetchData();
  };

  return { data, loading, error, refreshData };
}