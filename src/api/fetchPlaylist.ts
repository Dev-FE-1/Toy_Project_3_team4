import { collection, query, where, getDocs } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { PlaylistModel } from '@/types/playlist';

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
