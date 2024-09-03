import { collection, doc, getDoc } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { PlaylistModel } from '@/types/playlist';

const postsCollection = collection(db, 'playlists');

export async function getPlaylist({ playlistId }: { playlistId: string }): Promise<PlaylistModel> {
  const docRef = doc(postsCollection, playlistId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    throw new Error('No such document!');
  }

  return docSnap.data() as PlaylistModel;
}
