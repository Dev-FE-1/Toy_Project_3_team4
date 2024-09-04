import { useState, useCallback } from 'react';

import { fetchSearchResults, SearchType } from '@/api/algoliaSearch';

export const useSearch = () => {
  const [state, setState] = useState({
    results: null,
    isLoading: false,
    error: null,
  });

  const performSearch = useCallback(async (query: string, type: SearchType) => {
    setState((prevState) => ({ ...prevState, isLoading: true, error: null }));

    try {
      const results = await fetchSearchResults(type, query);
      console.log(results);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return { ...state, search: performSearch };
};
