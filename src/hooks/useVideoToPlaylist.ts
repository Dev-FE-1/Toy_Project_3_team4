import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { PlaylistModel, VideoModel } from '@/types/playlist';

export const useAddVideosToPlaylist = (playlistId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (videos: VideoModel[]) => {
      const playlistDocRef = doc(db, 'playlists', playlistId);
      await updateDoc(playlistDocRef, {
        videos: arrayUnion(...videos),
      });
    },
    onSuccess: (_, newVideos) => {
      queryClient.invalidateQueries({ queryKey: ['playlists', playlistId] });

      queryClient.setQueryData(['playlists', playlistId], (oldData: PlaylistModel | undefined) => {
        if (!oldData) return;
        return {
          ...oldData,
          videos: [...oldData.videos, ...newVideos],
        };
      });
    },
    onError: (error) => {
      console.error('Failed to add videos to playlist: ', error);
    },
  });
};

export const useAddVideosToMyPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ playlistId, videos }: { playlistId: string; videos: VideoModel[] }) => {
      const playlistDocRef = doc(db, 'playlists', playlistId);
      await updateDoc(playlistDocRef, {
        videos: arrayUnion(...videos),
      });
    },
    onSuccess: (_, { playlistId, videos }) => {
      queryClient.invalidateQueries({ queryKey: ['playlists', playlistId] });

      queryClient.setQueryData(['playlists', playlistId], (oldData: PlaylistModel | undefined) => {
        if (!oldData) return;
        return {
          ...oldData,
          videos: [...oldData.videos, ...videos],
        };
      });
    },
    onError: (error) => {
      console.error('Failed to add videos to playlist: ', error);
    },
  });
};

export const useDeletePlaylist = (playlistId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const playlistDocRef = doc(db, 'playlists', playlistId);
      await deleteDoc(playlistDocRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists', playlistId] });
    },
  });
};
