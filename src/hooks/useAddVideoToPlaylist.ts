import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, query, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { VideoModel } from '@/types/playlist';

export const useAddVideoToPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ playlistId, video }: { playlistId: string; video: VideoModel }) => {
      const playlistsCollection = collection(db, 'playlists');
      const q = query(playlistsCollection, where('playlistId', '==', playlistId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const playlistDoc = querySnapshot.docs[0];
        await updateDoc(playlistDoc.ref, {
          videos: arrayUnion(video),
        });
      } else {
        throw new Error('Playlist not found');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
    },
  });
};
