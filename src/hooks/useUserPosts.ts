import { useQuery } from '@tanstack/react-query';

import { getPostsByUserId } from '@/api/fetchPosts';

export const useUserPosts = (userId: string) => {
  const {
    data: userPosts = [],
    isLoading: loadingPosts,
    error,
  } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => getPostsByUserId({ userId }),
    enabled: !!userId,
  });

  return { userPosts, loadingPosts, error };
};
