import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { UserData } from '@/types/profile';

export const fetchUserData = async (userId: string): Promise<UserData | null> => {
  const userDoc = doc(db, 'users', userId);
  const docSnapshot = await getDoc(userDoc);
  if (docSnapshot.exists()) {
    return docSnapshot.data() as UserData;
  }
  return null;
};

export const fetchMultipleUsersByUserIds = async (userIds: string[]) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('__name__', 'in', userIds));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data());
};
