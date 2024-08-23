import { auth, db } from '@/api/firebaseApp';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function googleLogin() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // 로그인 성공 후 Firestore에 사용자 정보 저장
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

    console.log('구글 로그인 성공:', user);
  } catch (error) {
    console.error('구글 로그인 실패:', error);
  }
}

export function googleLogout() {
  signOut(auth)
    .then(() => {
      console.log('로그아웃 성공');
    })
    .catch((error) => {
      console.error('로그아웃 실패:', error);
    });
}
