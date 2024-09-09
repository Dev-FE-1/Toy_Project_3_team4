import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { PostModel } from '@/types/post';

export const useDeletePost = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const postDocRef = doc(db, 'posts', postId);
      await deleteDoc(postDocRef);
    },

    // 성공적으로 삭제되면 호출
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['filteredPostsTimelines', userId] });

      queryClient.setQueryData<PostModel[]>(['posts'], (oldPosts) => {
        if (!oldPosts) return [];

        return oldPosts.filter((post) => post.postId !== postId);
      });
    },

    onError: (error) => {
      console.error('Failed to delete post: ', error);
    },
  });
};
