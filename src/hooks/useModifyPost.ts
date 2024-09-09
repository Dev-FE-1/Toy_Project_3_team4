import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';

interface UpdatePostPayload {
  postId: string;
  description: string;
}

export const useModifyPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, description }: UpdatePostPayload) => {
      const postDocRef = doc(db, 'posts', postId);
      await updateDoc(postDocRef, { content: description });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
