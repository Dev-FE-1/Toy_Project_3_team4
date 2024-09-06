import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { PlaylistModel, VideoModel } from '@/types/playlist';

export const useRemoveVideoFromPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ playlistId, video }: { playlistId: string; video: VideoModel }) => {
      const playlistDocRef = doc(db, 'playlists', playlistId);
      await updateDoc(playlistDocRef, {
        videos: arrayRemove(video),
      });
    },
    onSuccess: (_, { playlistId, video }) => {
      queryClient.invalidateQueries({ queryKey: ['playlists', playlistId] });
      queryClient.setQueryData(['playlists', playlistId], (oldData: PlaylistModel | undefined) => {
        if (!oldData) return oldData;

        const updatedVideos = oldData.videos.filter(
          (existingVideo) => existingVideo.videoId !== video.videoId,
        );

        return {
          ...oldData,
          videos: [...updatedVideos],
        };
      });
    },
    onError: (error) => {
      console.error('Failed to remove video from playlist: ', error);
    },
  });
};
