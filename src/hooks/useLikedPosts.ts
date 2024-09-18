import { useQuery } from '@tanstack/react-query';

import { getPostsFilteredLikes } from '@/api/fetchPosts';

export const useLikedPosts = (userId: string) => {
  const {
    data: likedPosts = [],
    isLoading: loadingLikedPosts,
    error,
  } = useQuery({
    queryKey: ['likedPosts', userId],
    queryFn: () => getPostsFilteredLikes({ userId }),
    enabled: !!userId,
  });

  return { likedPosts, loadingLikedPosts, error };
};
