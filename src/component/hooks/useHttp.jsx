import { useState } from "react";

const useHttp = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const fetchData = async (url, config) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError({ message: error });
    }
    setIsLoading(false);
  };
  const clearData = () => {
    setData();
  };

  return {
    data,
    error,
    isLoading,
    fetchData,
    clearData,
  };
};
export default useHttp;
