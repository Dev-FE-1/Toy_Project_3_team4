import { useQuery } from '@tanstack/react-query';

import { getPostsFilteredLikes } from '@/api/fetchPosts';

export const useLikedPosts = (userId: string) => {
  const {
    data: likedPosts = [],
    isLoading: loadingLikedPosts,
    error,
  } = useQuery({
    queryKey: ['likedPosts', userId], // 쿼리 키
    queryFn: () => getPostsFilteredLikes({ userId }), // API 호출
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
  });

  return { likedPosts, loadingLikedPosts, error };
};
