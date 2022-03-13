import { useEffect, useState } from 'react';
import { Service } from './Service';
import { Category } from './Category';

// Interfaces to store categories retrieved from the API 
export interface Categories {
    categories: Category[];
}

// Custom hooks 
// Manages the fetch of data from the API
const useCategoriesService = () => {
  const [result, setResult] = useState<Service<Categories>>({
    status: 'loading'
  });

  useEffect(() => {
    fetch("/api/categories")
      .then(response => response.json())
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export default useCategoriesService;