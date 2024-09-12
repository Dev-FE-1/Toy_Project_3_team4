import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updatePostsLikes } from '@/api/fetchPosts';

export const useToggleLikes = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      await updatePostsLikes({ postId: postId, userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filteredPostsTimelines', userId] });
    },

    onError: (error) => {
      console.error('Failed to toggle Likes', error);
    },
  });
};
