import { useQuery } from '@tanstack/react-query';

import { getPostsByUserId } from '@/api/fetchPosts';

export const useUserPosts = (userId: string) => {
  const {
    data: userPosts = [],
    isLoading: loadingPosts,
    error,
  } = useQuery({
    queryKey: ['userPosts', userId], // 쿼리 키
    queryFn: () => getPostsByUserId({ userId }), // API 호출
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
  });

  return { userPosts, loadingPosts, error };
};
