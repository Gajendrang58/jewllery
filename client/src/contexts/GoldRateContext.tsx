import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getGoldRate, type GoldRateData } from "../api/getGoldRate";

interface GoldRateContextType {
  data: GoldRateData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const GoldRateContext = createContext<GoldRateContextType | undefined>(undefined);

export const GoldRateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<GoldRateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoldRate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getGoldRate();
      setData(response);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoldRate();
  }, [fetchGoldRate]);

  return (
    <GoldRateContext.Provider value={{ data, loading, error, refetch: fetchGoldRate }}>
      {children}
    </GoldRateContext.Provider>
  );
};

export const useGoldRateContext = () => {
  const context = useContext(GoldRateContext);
  if (!context) throw new Error("useGoldRateContext must be used within a GoldRateProvider");
  return context;
};
