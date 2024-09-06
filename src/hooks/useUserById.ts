import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';

import { UserModel } from '../types/user';

export const useUserById = (userId: string | null) => {
  return useQuery<UserModel | null>({
    queryKey: ['users', userId],
    queryFn: async (): Promise<UserModel | null> => {
      if (!userId) {
        return null;
      }

      const userDocRef = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        throw new Error('User not found');
      }

      const userData = userSnapshot.data() as UserModel;

      return {
        userId: userData.userId,
        displayName: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL,
        subscriptions: userData.subscriptions,
      };
    },
    enabled: !!userId,
  });
};
