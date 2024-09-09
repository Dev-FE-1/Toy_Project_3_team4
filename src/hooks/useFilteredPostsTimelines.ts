import { useInfiniteQuery } from '@tanstack/react-query';

import { getPostsByFollowingUsers, getPostsByNonFollowingUsers } from '@/api/fetchPosts';
import { PostModel } from '@/types/post';

interface UseFilteredPostsTimelinesProps {
  posts: PostModel[];
  nextCursor: string | null;
}

const POSTS_FETCH_LIMIT = 3;

export const useFilteredPostsTimelinesQuery = ({ userId }: { userId: string }) => {
  return useInfiniteQuery<UseFilteredPostsTimelinesProps>({
    queryKey: ['filteredPostsTimelines', userId],
    queryFn: async ({ pageParam = undefined }) => {
      let posts;
      const followingUserPosts = await getPostsByFollowingUsers({
        userId,
        count: POSTS_FETCH_LIMIT,
        lastPostId: pageParam as string | undefined,
      });
      posts = followingUserPosts;
      if (followingUserPosts.length < POSTS_FETCH_LIMIT) {
        const noneFollowingUserPosts = await getPostsByNonFollowingUsers({
          userId,
          count: POSTS_FETCH_LIMIT,
          lastPostId:
            followingUserPosts[followingUserPosts.length - 1]?.postId ||
            (pageParam as string | undefined),
        });
        posts = [...followingUserPosts, ...noneFollowingUserPosts];
      }
      return {
        posts: posts,
        nextCursor: posts.length > 2 ? posts[posts.length - 1].postId : null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
  });
};
