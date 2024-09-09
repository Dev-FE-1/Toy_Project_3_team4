import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { useAuth } from '@/hooks/useAuth';
import { PlaylistModel } from '@/types/playlist';

const MAX_FIRESTORE_IN_CLAUSE = 10;

export const useSubscribedPlaylists = () => {
  const user = useAuth();

  return useQuery<PlaylistModel[]>({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      if (!user) {
        return [];
      }

      const userDocRef = collection(db, 'users');
      const userQuery = query(userDocRef, where('userId', '==', user.uid));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        return [];
      }

      const userData = userSnapshot.docs[0].data();
      const subscribedPlaylistsIds = userData.subscriptions || [];

      if (subscribedPlaylistsIds.length === 0) {
        return [];
      }

      const playlists: PlaylistModel[] = [];
      const playlistsRef = collection(db, 'playlists');

      for (let i = 0; i < subscribedPlaylistsIds.length; i += MAX_FIRESTORE_IN_CLAUSE) {
        const chunk = subscribedPlaylistsIds.slice(i, i + MAX_FIRESTORE_IN_CLAUSE);
        const playlistsQuery = query(playlistsRef, where('playlistId', 'in', chunk));
        const playlistsSnapshot = await getDocs(playlistsQuery);

        playlistsSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          playlists.push({
            playlistId: data.playlistId,
            userId: data.userId,
            title: data.title,
            createdAt: data.createdAt,
            isPublic: data.isPublic,
            videos: data.videos,
          } as PlaylistModel);
        });
      }

      return playlists;
    },
    enabled: !!user,
  });
};
