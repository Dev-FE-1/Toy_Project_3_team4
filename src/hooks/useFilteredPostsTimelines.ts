import { useInfiniteQuery } from '@tanstack/react-query';

import { getPostsByFollowingUsers, getPostsByNonFollowingUsers } from '@/api/fetchPosts';
import { PostModel } from '@/types/post';

interface UseFilteredPostsTimelinesProps {
  posts: PostModel[];
  nextCursor: string | null;
}

export const useFilteredPostsTimelinesQuery = ({ userId }: { userId: string }) => {
  return useInfiniteQuery<UseFilteredPostsTimelinesProps>({
    queryKey: ['filteredPostsTimelines', userId],
    queryFn: async ({ pageParam = undefined }) => {
      let posts;
      const followingUserPosts = await getPostsByFollowingUsers({
        userId,
        count: 1,
        lastPostId: pageParam as string | undefined,
      });
      posts = followingUserPosts;
      if (followingUserPosts.length <= 0) {
        const noneFollowingUserPosts = await getPostsByNonFollowingUsers({
          userId,
          count: 1,
          lastPostId: pageParam as string | undefined,
        });
        posts = noneFollowingUserPosts;
      }
      return {
        posts: posts,
        nextCursor: posts.length > 0 ? posts[posts.length - 1].postId : null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
  });
};
