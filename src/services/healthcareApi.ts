import axios from 'axios';
import type { HealthcareData, CountryData } from '../types/index';

const BASE_URL = 'https://api.worldbank.org/v2';

export const fetchHealthcareData = async (countryCode: string, year: number): Promise<any> => {
  try {
    const [healthExp, lifeExp] = await Promise.all([
      axios.get(`${BASE_URL}/country/${countryCode}/indicator/SH.XPD.CHEX.GD.ZS?format=json&date=${year}`),
      axios.get(`${BASE_URL}/country/${countryCode}/indicator/SP.DYN.LE00.IN?format=json&date=${year}`)
    ]);

    const spending = healthExp.data[1]?.[0]?.value || 0;
    const lifeExpectancy = lifeExp.data[1]?.[0]?.value || 0;

    // Fetch historical data for trends
    const historicalData = await axios.get(
      `${BASE_URL}/country/${countryCode}/indicator/SH.XPD.CHEX.GD.ZS?format=json&date=${year-4}:${year}`
    );

    const spendingVsLife = {
      labels: ['USA', 'GBR', 'DEU', 'FRA', 'JPN'],
      datasets: [
        {
          label: 'Healthcare Spending (% of GDP)',
          data: [spending, 10.2, 11.7, 11.2, 10.9],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Life Expectancy (years)',
          data: [lifeExpectancy, 81.3, 81.1, 82.5, 84.2],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    const years = historicalData.data[1]
      .sort((a: any, b: any) => a.date - b.date)
      .map((item: any) => item.date);
    
    const values = historicalData.data[1]
      .sort((a: any, b: any) => a.date - b.date)
      .map((item: any) => item.value);

    const diseaseTrends = {
      labels: years,
      datasets: [
        {
          label: 'Healthcare Spending Trend (% of GDP)',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
      ],
    };

    return {
      country: countryCode,
      year,
      spending,
      lifeExpectancy,
      diseasePrevalence: values[values.length - 1] - values[0], // Calculate change over time
      spendingVsLife,
      diseaseTrends,
    };
  } catch (error) {
    console.error('Error fetching World Bank data:', error);
    throw error;
  }
};

export const fetchCountries = async (): Promise<CountryData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/country?format=json&per_page=300`);
    return response.data[1]
      .filter((country: any) => country.region.value) // Filter out aggregates
      .map((country: any) => ({
        name: country.name,
        code: country.id,
        region: country.region.value
      }));
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};