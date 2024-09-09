import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, addDoc, updateDoc, Timestamp, doc } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { useAuth } from '@/hooks/useAuth';
import { PlaylistModel } from '@/types/playlist';

export const useAddPlaylist = () => {
  const queryClient = useQueryClient();
  const user = useAuth();

  return useMutation({
    mutationFn: async ({ title, isPublic }: { title: string; isPublic: boolean }) => {
      if (!user) {
        throw new Error('User not authenticated');
      }

      const playlistsCollection = collection(db, 'playlists');
      const playlistDocRef = await addDoc(playlistsCollection, {
        userId: user.uid,
        title,
        createdAt: Timestamp.now(),
        isPublic,
        videos: [],
      });

      const playlistId = playlistDocRef.id;
      await updateDoc(playlistDocRef, { playlistId });

      return {
        playlistId,
        userId: user.uid,
        title,
        createdAt: Timestamp.now(),
        isPublic,
        videos: [],
      } as PlaylistModel;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
    },
  });
};

export const useUpdatePlaylist = (playlistId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData: Partial<PlaylistModel>) => {
      if (!playlistId) {
        throw new Error('플레이리스트 ID가 없습니다.');
      }

      const playlistDocRef = doc(db, 'playlists', playlistId);
      await updateDoc(playlistDocRef, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
    },
  });
};
