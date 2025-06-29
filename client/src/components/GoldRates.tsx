// components/GoldRate.tsx
import React from 'react';
import { useGoldRate } from '../hooks/useGoldRate';

const GoldRate: React.FC = () => {
  const { data, error, loading } = useGoldRate();

  if (loading) return <div>Loading gold rates...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available.</div>;

  return (
    <div>
      <h2>Gold Rate in {data.city}</h2>
      <p>Date: {data.date}</p>
      <p>Last Updated: {data.lastUpdated}</p>

      <h3>24K Gold</h3>
      <p>1 gram: ₹{data.rates["24K"]["1_gram"]}</p>
      <p>8 grams: ₹{data.rates["24K"]["8_grams"]}</p>

      <h3>22K Gold</h3>
      <p>1 gram: ₹{data.rates["22K"]["1_gram"]}</p>
      <p>8 grams: ₹{data.rates["22K"]["8_grams"]}</p>

      <small>
        Source: <a href={data.source} target="_blank" rel="noreferrer">{data.source}</a>
      </small>
    </div>
  );
};

export default GoldRate;
