import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  where,
  getDocs,
  query,
} from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { useAuth } from '@/hooks/useAuth';

export const useSubscribePlaylist = (playlistId: string) => {
  const queryClient = useQueryClient();
  const currentUser = useAuth();

  return useMutation({
    mutationFn: async () => {
      if (!currentUser?.uid || !playlistId) {
        throw new Error('로그인하지 않았거나 유효하지 않은 플레이리스트 ID입니다.');
      }

      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        subscriptions: arrayUnion(playlistId),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', playlistId] });
    },
  });
};

export const useUnsubscribePlaylist = (playlistId: string) => {
  const queryClient = useQueryClient();
  const currentUser = useAuth();

  return useMutation({
    mutationFn: async () => {
      if (!currentUser?.uid || !playlistId) {
        throw new Error('로그인하지 않았거나 유효하지 않은 플레이리스트 ID입니다.');
      }

      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        subscriptions: arrayRemove(playlistId),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', playlistId] });
    },
  });
};

export const useCheckSubscription = (playlistId: string) => {
  const user = useAuth();

  return useQuery<boolean>({
    queryKey: ['subscriptions', playlistId],
    queryFn: async () => {
      if (!user) return false;

      const subscriptionsRef = collection(db, 'subscriptions');
      const q = query(subscriptionsRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const subscriptionDoc = querySnapshot.docs[0].data();
        return subscriptionDoc.playlists.includes(playlistId);
      }

      return false;
    },
    enabled: !!user,
  });
};
