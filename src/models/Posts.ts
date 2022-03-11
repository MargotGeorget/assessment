import { useEffect, useState } from 'react';
import { Service } from './Service';
import { Post } from './Post';

export interface Posts {
  posts: Post[];
}

// Custom hooks 
// pour reutiliser des actions effectuees dans les hooks par defaut dans plusieurs fonctions differentes 
const usePostService = () => {
  const [result, setResult] = useState<Service<Posts>>({
    status: 'loading'
  });

  useEffect(() => {
    fetch("/api/posts")
      .then(response => response.json())
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export default usePostService;