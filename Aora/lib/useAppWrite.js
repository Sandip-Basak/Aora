import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'

const useAppWrite = (fn) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    // Using a async function like this as using async directly in useEffect is illegal
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const refetch = () => {
    fetchData();
  }

  return { data, isLoading, refetch };
}
export default useAppWrite;