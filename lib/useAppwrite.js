import { useEffect, useState } from "react";
import { Alert } from "react-native";

function useAppwrite(fn) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();
      console.log(`Returning Response from ${fn.name}\n------------------`);

      setData(response);
    } catch (error) {
      Alert.alert('Error', `${error.message}, [${fn.name}] ((tabs)/useAppwrite.jsx)`)
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