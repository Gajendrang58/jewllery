// api/getGoldRate.ts
import axios from 'axios';

export type GoldRateData = {
  success: boolean;
  city: string;
  date: string;
  lastUpdated: string;
  currency: string;
  timestamp: string;
  source: string;
  rates: {
    "24K": {
      "1_gram": string;
      "8_grams": string;
    };
    "22K": {
      "1_gram": string;
      "8_grams": string;
    };
  };
};
const baseUrl = import.meta.env.VITE_API_BASE_URL;
console.log(baseUrl)

export const getGoldRate = async (): Promise<GoldRateData> => {
  const response = await axios.get<GoldRateData>(`${baseUrl}/gold-rate`);
  return response.data;
};
