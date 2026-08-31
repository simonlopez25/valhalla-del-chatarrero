import { useState, useEffect } from 'react';
import { fetchCategories } from '../../../services/products.js';

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchCategories();
        if (!ignore) {
          setCategories(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  return { categories, isLoading, error };
}
