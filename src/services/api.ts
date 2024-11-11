import axios from 'axios';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const WHO_API_BASE = 'https://ghoapi.azureedge.net/api';
const CDC_API_BASE = 'https://data.cdc.gov/resource';
const WORLD_BANK_API_BASE = 'https://api.worldbank.org/v2';

// WHO API
export const whoApi = axios.create({
  baseURL: `${CORS_PROXY}${WHO_API_BASE}`,
  params: {
    $format: 'json',
  },
  headers: {
    'x-requested-with': 'XMLHttpRequest',
  },
});

// CDC API
export const cdcApi = axios.create({
  baseURL: `${CORS_PROXY}${CDC_API_BASE}`,
  params: {
    '$$app_token': 'xBNhHOeZknsKPlnMC8UKzt4HU', // Replace with your CDC app token if required
  },
  headers: {
    'x-requested-with': 'XMLHttpRequest',
  },
});

// World Bank API
export const worldBankApi = axios.create({
  baseURL: `${CORS_PROXY}${WORLD_BANK_API_BASE}`,
  params: {
    format: 'json',
  },
  headers: {
    'x-requested-with': 'XMLHttpRequest',
  },
});

export const fetchHealthIndicators = async (filters) => {
  const { year, causeOfDeath, ageRange } = filters;
  try {
    // WHO - Life expectancy data
    const whoResponse = await whoApi.get('/WHOSIS_000001');

    // CDC - Mortality data
    let whereClauses = [];
    if (year) whereClauses.push(`year=${year}`);
    if (causeOfDeath) whereClauses.push(`cause_of_death='${causeOfDeath}'`);
    if (ageRange) whereClauses.push(`age_range='${ageRange}'`);
    const where = whereClauses.length > 0 ? whereClauses.join(' AND ') : '';

    const cdcResponse = await cdcApi.get('/bi63-dtpu.json', {
      params: {
        // $limit: 10,
        // $order: 'submission_date DESC',
        // ...(where && { $where: where }),
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