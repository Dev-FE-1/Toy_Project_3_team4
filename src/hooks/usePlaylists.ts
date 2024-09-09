import { useQuery } from '@tanstack/react-query';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { useAuth } from '@/hooks/useAuth';
import { PlaylistModel } from '@/types/playlist';

export const useUserPlaylists = (userId?: string) => {
  const currentUser = useAuth();

  return useQuery<PlaylistModel[]>({
    queryKey: ['playlists', userId || currentUser?.uid],
    queryFn: async () => {
      const userIdToUse = userId || currentUser?.uid;

      if (!userIdToUse) {
        return [];
      }

      const playlistsRef = collection(db, 'playlists');
      const q = query(
        playlistsRef,
        where('userId', '==', userIdToUse),
        orderBy('createdAt', 'desc'),
      );

      const querySnapshot = await getDocs(q);

      const playlists = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          playlistId: data.playlistId,
          userId: data.userId,
          title: data.title,
          createdAt: data.createdAt,
          isPublic: data.isPublic,
          videos: data.videos,
        } as PlaylistModel;
      });

      return playlists;
    },
    enabled: !!currentUser || !!userId,
  });
};

export const usePlaylistById = (playlistId?: string) => {
  return useQuery<PlaylistModel | null>({
    queryKey: ['playlists', playlistId],
    queryFn: async () => {
      if (!playlistId) return null;

      const playlistsRef = collection(db, 'playlists');
      const q = query(playlistsRef, where('playlistId', '==', playlistId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const playlistDoc = querySnapshot.docs[0];
        return { ...playlistDoc.data() } as PlaylistModel;
      } else {
        return null;
      }
    },
    enabled: !!playlistId,
  });
};
