// src/hooks/useFetch.js
import { useState, useEffect } from 'react';
import {getRequest} from '../axios'

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequest(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
      fetchData();
    }, []);

  return { data, loading, error };
};
