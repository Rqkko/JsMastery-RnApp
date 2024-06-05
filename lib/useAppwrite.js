import { useEffect, useState } from "react";

function useAppwrite(fn) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      setData(response);
    } catch (error) {
      Alert.alert('Error', `${error.message} ((tabs)/home.jsx)`)
    } finally {
      setIsLoading(false);
    }
  }

  // Call fetchData once at the start
  useEffect(() => {
    fetchData();
  }, [])

  function refetch() {
    fetchData();
  }

  return { data, isLoading, refetch }
}

export default useAppwrite;