import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { getPostByPostId, updatePostsLikes } from '@/api/fetchPosts';
import { UseFilteredPostsTimelinesProps } from '@/hooks/useFilteredPostsTimelines';

export const useToggleLikes = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      await updatePostsLikes({ postId: postId, userId });
      const updatedPost = await getPostByPostId({ postId });
      return updatedPost;
    },
    onSuccess: (updatedPost) => {
      queryClient.setQueryData<InfiniteData<UseFilteredPostsTimelinesProps>>(
        ['filteredPostsTimelines', userId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.map((post) =>
                post.postId === updatedPost.postId ? updatedPost : post,
              ),
            })),
          };
        },
      );
    },
    onError: (error) => {
      console.error('Failed to toggle Likes', error);
    },
  });
};
