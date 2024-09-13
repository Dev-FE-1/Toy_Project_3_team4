import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { PostModel } from '@/types/post';

export const usePostById = (postId: string) => {
  return useQuery<PostModel, Error>({
    queryKey: ['post', postId],
    queryFn: async (): Promise<PostModel> => {
      if (!postId) throw new Error('Post ID is required');
      const docRef = doc(db, 'posts', postId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return { postId: docSnap.id, ...data } as PostModel;
      } else {
        throw new Error('Post not found');
      }
    },
    enabled: !!postId,
  });
};
