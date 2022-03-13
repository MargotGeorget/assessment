import { useEffect, useState } from 'react';
import { Service } from './Service';
import { Post } from './Post';

// Interfaces to store posts retrieved from the API 
export interface Posts {
  posts: Post[];
}

// Custom hooks 
// Manages the fetch of data from the API
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