// hooks/useGoldRate.ts
import { useCallback, useEffect, useState } from 'react';
import { getGoldRate, type GoldRateData } from '../api/getGoldRate';

export const useGoldRate = () => {
  const [data, setData] = useState<GoldRateData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = useCallback (async () => {
      try {
        const result = await getGoldRate();
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    },[])
  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, loading, refetch:fetchData };
};
