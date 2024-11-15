import axios from 'axios';

const BASE_URL = 'https://api.worldbank.org/v2';

export interface CountryData {
  id: string;
  name: string;
  region: string;
  healthExpenditure: number;
  gdpPerCapita: number;
  maternalMortality: number;
  lifeExpectancy: number;
}

export async function fetchWorldBankData(): Promise<CountryData[]> {
  try {
    const [healthExp, gdp, maternal, life] = await Promise.all([
      axios.get(`${BASE_URL}/country/all/indicator/SH.XPD.CHEX.GD.ZS?format=json&per_page=300&mrnev=1`),
      axios.get(`${BASE_URL}/country/all/indicator/NY.GDP.PCAP.CD?format=json&per_page=300&mrnev=1`),
      axios.get(`${BASE_URL}/country/all/indicator/SH.STA.MMRT?format=json&per_page=300&mrnev=1`),
      axios.get(`${BASE_URL}/country/all/indicator/SP.DYN.LE00.IN?format=json&per_page=300&mrnev=1`)
    ]);

    const countries = new Map<string, CountryData>();

    [healthExp, gdp, maternal, life].forEach(response => {
      response.data[1]?.forEach((item: any) => {
        if (!countries.has(item.country.id)) {
          countries.set(item.country.id, {
            id: item.country.id,
            name: item.country.value,
            region: '',
            healthExpenditure: 0,
            gdpPerCapita: 0,
            maternalMortality: 0,
            lifeExpectancy: 0
          });
        }
        
        const country = countries.get(item.country.id)!;
        if (item.indicator.id === 'SH.XPD.CHEX.GD.ZS') country.healthExpenditure = item.value || 0;
        if (item.indicator.id === 'NY.GDP.PCAP.CD') country.gdpPerCapita = item.value || 0;
        if (item.indicator.id === 'SH.STA.MMRT') country.maternalMortality = item.value || 0;
        if (item.indicator.id === 'SP.DYN.LE00.IN') country.lifeExpectancy = item.value || 0;
      });
    });

    return Array.from(countries.values()).filter(country => 
      country.healthExpenditure && 
      country.gdpPerCapita && 
      country.maternalMortality && 
      country.lifeExpectancy
    );
  } catch (error) {
    console.error('Error fetching World Bank data:', error);
    throw error;
  }
}