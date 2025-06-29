// types/goldRate.ts
export interface GoldRate {
  '1_gram': string;
  '8_grams': string;
}

export interface GoldRateResponse {
  success: boolean;
  city: string;
  date: string;
  lastUpdated: string;
  rates: {
    '24K': GoldRate;
    '22K': GoldRate;
  };
  currency: string;
  source: string;
  timestamp: string;
}