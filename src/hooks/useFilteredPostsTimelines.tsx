import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchFilteredPostsTimelines } from '@/api/fetchPosts';
import { PostModel } from '@/types/post';

interface UseFilteredPostsTimelinesProps {
  posts: PostModel[];
  nextCursor: string | null;
}

export const useFilteredPostsTimelinesQuery = ({ userId }: { userId: string }) => {
  return useInfiniteQuery<UseFilteredPostsTimelinesProps>({
    queryKey: ['filteredPostsTimelines', userId],
    queryFn: async ({ pageParam = undefined }) => {
      const posts = await fetchFilteredPostsTimelines({
        userId,
        count: 3,
        lastPostId: pageParam as string | undefined,
      });
      return {
        posts,
        nextCursor: posts.length > 1 ? posts[posts.length - 1].postId : null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
  });
};
