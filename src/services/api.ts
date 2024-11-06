import axios from 'axios';
import queryString from 'query-string';

const WHO_API_BASE = 'https://ghoapi.azureedge.net/api';
const CDC_API_BASE = 'https://data.cdc.gov/api/views';
const WORLD_BANK_API_BASE = 'https://api.worldbank.org/v2';

// WHO API
export const whoApi = axios.create({
  baseURL: WHO_API_BASE,
  params: {
    $format: 'json',
  },
});

// CDC API
export const cdcApi = axios.create({
  baseURL: CDC_API_BASE,
});

// World Bank API
export const worldBankApi = axios.create({
  baseURL: WORLD_BANK_API_BASE,
  params: {
    format: 'json',
  },
});

export const fetchHealthIndicators = async () => {
  try {
    // WHO - Life expectancy data
    const whoResponse = await whoApi.get('/indicator/WHOSIS_000001');
    
    // CDC - COVID-19 Cases
    const cdcResponse = await cdcApi.get('/9mfq-cb36/rows.json', {
      params: {
        $limit: 10,
        $order: 'submission_date DESC',
      },
    });

    // World Bank - Health expenditure data
    const worldBankResponse = await worldBankApi.get('/country/all/indicator/SH.XPD.CHEX.GD.ZS', {
      params: {
        per_page: 100,
        mrnev: 1, // Most recent non-empty value
      },
    });

    return {
      who: whoResponse.data,
      cdc: cdcResponse.data,
      worldBank: worldBankResponse.data[1], // World Bank returns metadata in [0]
    };
  } catch (error) {
    console.error('Error fetching health indicators:', error);
    throw error;
  }
};

export const fetchDemographicData = async (country = 'all') => {
  try {
    const response = await worldBankApi.get(`/country/${country}/indicator/SP.POP.AGE.RT`, {
      params: {
        per_page: 100,
        mrnev: 1,
      },
    });
    return response.data[1];
  } catch (error) {
    console.error('Error fetching demographic data:', error);
    throw error;
  }
};

export const fetchRiskFactors = async () => {
  try {
    const response = await whoApi.get('/indicator/SA_0000001462');
    return response.data;
  } catch (error) {
    console.error('Error fetching risk factors:', error);
    throw error;
  }
};