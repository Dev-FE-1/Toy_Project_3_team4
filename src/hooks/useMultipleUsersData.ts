import { useQueries, UseQueryOptions } from '@tanstack/react-query';

import { fetchUserData } from '@/api/fetchUsers';
import { UserData } from '@/types/profile';

export const useMultipleUsersData = (userIds: string[]) => {
  const userQueries = useQueries({
    queries: userIds.map(
      (id) =>
        ({
          queryKey: ['user', id],
          queryFn: () => fetchUserData(id),
          staleTime: 5 * 60 * 1000,
          cacheTime: 30 * 60 * 1000,
        }) as UseQueryOptions<UserData | null, Error, UserData | null, string[]>,
    ),
  });

  const isLoading = userQueries.some((query) => query.isLoading);
  const isError = userQueries.some((query) => query.isError);
  const errors = userQueries.map((query) => query.error).filter(Boolean);

  const usersData = userQueries.reduce(
    (acc, query, index) => {
      if (query.data) {
        acc[userIds[index]] = query.data;
      }
      return acc;
    },
    {} as Record<string, UserData>,
  );

  return { usersData, isLoading, isError, errors };
};
