import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchSearchResults, SearchType } from '@/api/algoliaSearch';
import { fetchMultiplePostsByPostIds } from '@/api/fetchPosts';
import { fetchMultipleUsersByUserIds } from '@/api/fetchUsers';
import { PostModel } from '@/types/post';
import { UserModel } from '@/types/user';

type SearchResultType<T extends SearchType> = T extends 'user' ? UserModel[] : PostModel[];

export const useSearch = <T extends SearchType>(
  type: T | null,
  query: string,
): UseQueryResult<SearchResultType<T>, Error> => {
  return useQuery({
    queryKey: ['search', type, query],
    queryFn: async () => {
      if (!query || !type) return [];
      if (type !== 'user' && type !== 'post') {
        throw new Error('올바른 타입이 아닙니다.');
      }

      try {
        const algoliaResults = await fetchSearchResults(type, query);
        const objectIds = algoliaResults.map((result) => result.objectID);

        if (type === 'user') {
          return fetchMultipleUsersByUserIds(objectIds);
        } else {
          return fetchMultiplePostsByPostIds(objectIds);
        }
      } catch (error) {
        console.warn(error);
        throw new Error('검색 실패');
      }
    },
    enabled: !!query && !!type,
    staleTime: 1000 * 60 * 5,
  });
};
