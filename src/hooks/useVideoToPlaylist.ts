import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc, arrayUnion, deleteDoc, getDoc } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { PlaylistModel, VideoModel } from '@/types/playlist';

import { useAuth } from './useAuth';

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
  const user = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const playlistDocRef = doc(db, 'playlists', playlistId);
      await deleteDoc(playlistDocRef);

      const checkDeleted = async () => {
        const docSnap = await getDoc(playlistDocRef);
        if (docSnap.exists()) {
          throw new Error('Playlist not deleted');
        }
      };

      for (let i = 0; i < 3; i++) {
        try {
          await checkDeleted();
          break;
        } catch (error) {
          if (i === 2) throw error;
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['playlists', user?.uid] });
      const previousPlaylists = queryClient.getQueryData<PlaylistModel[]>(['playlists', user?.uid]);

      queryClient.setQueryData<PlaylistModel[]>(['playlists', user?.uid], (old) =>
        old ? old.filter((playlist) => playlist.playlistId !== playlistId) : [],
      );

      return { previousPlaylists };
    },
    onError: (err, context: { previousPlaylists?: PlaylistModel[] }) => {
      if (context?.previousPlaylists) {
        queryClient.setQueryData<PlaylistModel[]>(
          ['playlists', user?.uid],
          context.previousPlaylists,
        );
      }
      console.error('Failed to delete playlist', err);
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['playlists', playlistId] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists', user?.uid] });

      queryClient.refetchQueries({ queryKey: ['playlists', user?.uid] }).then(() => {
        queryClient.invalidateQueries({ queryKey: ['playlists', user?.uid] });
      });
    },
  });
};
