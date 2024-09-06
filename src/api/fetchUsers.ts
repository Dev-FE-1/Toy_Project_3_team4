import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { UserData } from '@/types/profile';
import { UserModel } from '@/types/user';

const usersCollection = collection(db, 'users');

export const fetchUserData = async (userId: string): Promise<UserData | null> => {
  const userDoc = doc(db, 'users', userId);
  const docSnapshot = await getDoc(userDoc);
  if (docSnapshot.exists()) {
    return docSnapshot.data() as UserData;
  }
  return null;
};

export const getUserInfoByUserId = async ({ userId }: { userId: string }): Promise<UserModel> => {
  const userDoc = doc(usersCollection, userId);
  const userDocSnapshot = await getDoc(userDoc);
  return { userId: userDocSnapshot.id, ...userDocSnapshot.data() } as UserModel;
};

export const updateUserInfoByUserId = async ({
  userId,
  displayName,
  email,
  photoURL,
}: UserModel): Promise<UserModel> => {
  const userDoc = doc(usersCollection, userId);
  await updateDoc(userDoc, { displayName, photoURL, email });
  return { userId, displayName, email, photoURL };
};

export const fetchMultipleUsersByUserIds = async (userIds: string[]) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('__name__', 'in', userIds));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data());
};
