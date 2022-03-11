import { useEffect, useState } from 'react';
import { Service } from './Service';
import { Category } from './Category';

export interface Categories {
    categories: Category[];
}

// Custom hooks 
// pour reutiliser des actions effectuees dans les hooks par defaut dans plusieurs fonctions differentes 
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