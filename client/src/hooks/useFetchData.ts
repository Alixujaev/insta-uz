import { useState, useEffect } from "react";

type FetchFunction<T> = (token: string) => Promise<{ data: { data: T } }>;

const cache: Record<string, any> = {};

const useFetchData = <T>(key: string, fetchFunction: FetchFunction<T>) => {
  const [data, setData] = useState<T | null>(cache[key] || null);
  const [isLoading, setIsLoading] = useState(!cache[key]);
  const [error, setError] = useState<Error | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchFunction(token);
        cache[key] = response.data.data;
        setData(response.data.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!cache[key]) {
      fetchData();
    }
  }, [key, fetchFunction, token]);

  return { data, isLoading, error };
};

export default useFetchData;
