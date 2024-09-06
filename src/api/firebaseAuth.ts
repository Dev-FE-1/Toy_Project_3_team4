import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, Timestamp } from 'firebase/firestore';

import { auth, db } from '@/api/firebaseApp';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const { user } = await signInWithPopup(auth, provider);

    const userDoc = doc(db, 'users', user.uid);
    const docSnapshot = await getDoc(userDoc);

    if (!docSnapshot.exists()) {
      await setDoc(userDoc, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        userId: user.uid,
        bio: '',
        subscriptions: [] as string[],
        followers: [] as string[],
        following: [] as string[],
      });

      const playlistsCollection = collection(db, 'playlists');
      const newPlaylistDocRef = doc(playlistsCollection);
      const playlistId = newPlaylistDocRef.id;

      await setDoc(newPlaylistDocRef, {
        playlistId: playlistId,
        userId: user.uid,
        title: '분류되지 않은 목록',
        createdAt: Timestamp.now(),
        isPublic: false,
        videos: [],
      });
    }

    return user;
  } catch (error) {
    console.error('Google 로그인 실패', error);
    throw error;
  }
};

export const signOutWithGoogle = async (
  onSuccess?: () => void,
  onError?: (error: Error) => void,
) => {
  try {
    await signOut(auth);
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    console.error('로그아웃 실패:', error);
    if (onError && error instanceof Error) {
      onError(error);
    }
  }
};
