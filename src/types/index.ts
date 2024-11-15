export interface HealthcareData {
  country: string;
  year: number;
  spending: number;
  lifeExpectancy: number;
  diseasePrevalence: number;
}

export interface CountryData {
  name: string;
  code: string;
  region: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}