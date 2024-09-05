import { algoliasearch } from 'algoliasearch';

const ALGOLIA_APP_ID = import.meta.env.VITE_ALGOLIA_APP_ID!;
const ALGOLIA_SEARCH_API_KEY = import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY!;

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY);

export type SearchType = 'user' | 'post';

export const fetchSearchResults = async <T extends SearchType>(type: T, query: string) => {
  const indexName = type === 'user' ? 'users_index' : 'posts_index';
  const { hits } = await client.searchSingleIndex({
    indexName,
    searchParams: { query },
  });
  return hits;
};
