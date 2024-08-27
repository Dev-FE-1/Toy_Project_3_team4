import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

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
        uid: user.uid,
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
