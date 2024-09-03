import { useQuery } from '@tanstack/react-query';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { useAuth } from '@/hooks/useAuth';
import { PlaylistModel } from '@/types/playlist';

export const useUserPlaylists = () => {
  const user = useAuth();

  return useQuery<PlaylistModel[]>({
    queryKey: ['playlists', user?.uid],
    queryFn: async () => {
      if (!user) {
        return [];
      }

      const playlistsRef = collection(db, 'playlists');
      const q = query(playlistsRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const playlists = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          playlistId: data.playlistId,
          userId: data.userId,
          title: data.title,
          createdAt: data.createdAt.toDate(),
          isPublic: data.isPublic,
          videos: data.videos,
        } as PlaylistModel;
      });

      return playlists.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    },
    enabled: !!user,
  });
};

export const usePlaylistById = (playlistId?: string) => {
  return useQuery<PlaylistModel | null>({
    queryKey: ['playlist', playlistId],
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
