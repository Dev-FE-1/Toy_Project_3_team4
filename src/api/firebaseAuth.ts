import { GoogleAuthProvider, signInWithPopup, signOut, getAuth } from 'firebase/auth';

import { fetchCreateUser } from '@/api/fetchUsers';
import { auth } from '@/api/firebaseApp';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const { user } = await signInWithPopup(auth, provider);

    await fetchCreateUser({
      userId: user.uid,
      displayName: user.displayName || '',
      email: user.email || '',
      photoURL: user.photoURL || '',
    });

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

export const getCurrentUserUid = (): string | null => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? user.uid : null;
};
