import { useInfiniteQuery } from '@tanstack/react-query';

import { getPostsByFollowingUsers } from '@/api/fetchPosts';
import { PostModel } from '@/types/post';

interface UseFilteredPostsTimelinesProps {
  posts: PostModel[];
  nextCursor: string | null;
}

// const getTimeLinePostsByFollowingUsersAndOthers = () => {};
// const getPostsByNotFollowingUsers = () => {};

/*
{
 followingPosts: PostModel[];
 lastFollowtingPosts: lastPostId,
 lastOtherPosts: lastPostId,
 isFollowingPostsEnd: boolean끝끝
 nextCursor: posts.length > 0 ? posts[posts.length - 1].postId : null;
}
*/
// null리턴하면 끝

export const useFilteredPostsTimelinesQuery = ({ userId }: { userId: string }) => {
  return useInfiniteQuery<UseFilteredPostsTimelinesProps>({
    queryKey: ['filteredPostsTimelines', userId],
    queryFn: async ({ pageParam = undefined }) => {
      const followingPosts = await getPostsByFollowingUsers({
        userId,
        count: 1,
        lastPostId: pageParam as string | undefined,
      });
      return {
        posts: followingPosts,
        nextCursor:
          followingPosts.length > 0 ? followingPosts[followingPosts.length - 1].postId : null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
  });
};
