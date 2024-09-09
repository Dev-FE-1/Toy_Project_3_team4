import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { PlaylistModel, VideoModel } from '@/types/playlist';

const postsCollection = collection(db, 'playlists');

export const getPlaylist = async ({
  playlistId,
}: {
  playlistId: string;
}): Promise<PlaylistModel> => {
  const q = query(postsCollection, where('playlistId', '==', playlistId));
  const querySnapshot = await getDocs(q);
  const playlist = querySnapshot.docs.map(
    (doc) => ({ playlistId: doc.id, ...doc.data() }) as PlaylistModel,
  );
  return playlist[0];
};

export const updatePlaylistOrder = async (playlistId: string, newVideoOrder: VideoModel[]) => {
  const playlistRef = doc(db, 'playlists', playlistId);

  try {
    await updateDoc(playlistRef, {
      videos: newVideoOrder,
    });
  } catch (error) {
    console.error('플레이리스트 순서 업데이트 실패:', error);
    throw error;
  }
};
