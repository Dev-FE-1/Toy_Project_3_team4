import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  collection,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  doc,
  arrayUnion,
  Timestamp,
} from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { useAuth } from '@/hooks/useAuth';

interface CreatePostParams {
  playlistId: string;
  videoId: string;
  description: string;
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const user = useAuth();

  return useMutation({
    mutationFn: async ({ playlistId, videoId, description }: CreatePostParams) => {
      if (!user) {
        throw new Error('로그인 된 유저가 없습니다');
      }

      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const videoThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

      const postsCollection = collection(db, 'posts');
      const postDocRef = await addDoc(postsCollection, {
        content: description,
        createdAt: Timestamp.now(),
        likes: [],
        playlistId,
        userId: user.uid,
        video: videoUrl,
      });

      await updateDoc(postDocRef, { postId: postDocRef.id });

      const playlistsCollection = collection(db, 'playlists');
      const playlistDocRef = doc(playlistsCollection, playlistId);
      const playlistSnapshot = await getDoc(playlistDocRef);

      const videoData = {
        videoId: videoId,
        thumbnailUrl: videoThumbnailUrl,
        videoUrl: videoUrl,
      };

      if (!playlistSnapshot.exists()) {
        await setDoc(playlistDocRef, {
          playlistId: playlistId,
          videos: [videoData],
          createdAt: Timestamp.now(),
          createdBy: user.uid,
        });
      } else {
        const playlistData = playlistSnapshot.data();
        const videos = playlistData.videos || [];

        const videoExists = videos.some((video: { videoId: string }) => video.videoId === videoId);

        if (!videoExists) {
          await updateDoc(playlistDocRef, {
            videos: arrayUnion(videoData),
          });
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
      queryClient.invalidateQueries({ queryKey: ['filteredPostsTimelines', user?.uid] });
    },
  });
};
