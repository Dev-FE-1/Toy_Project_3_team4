import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { UserModel } from '@/types/user';

const usersCollection = collection(db, 'users');

export async function getUserInfoByUserId({ userId }: { userId: string }): Promise<UserModel> {
  const userDoc = doc(usersCollection, userId);
  const userDocSnapshot = await getDoc(userDoc);
  return { userId: userDocSnapshot.id, ...userDocSnapshot.data() } as UserModel;
}

export async function updateUserInfoByUserId({
  userId,
  displayName,
  email,
  photoURL,
}: UserModel): Promise<UserModel> {
  const userDoc = doc(usersCollection, userId);
  await updateDoc(userDoc, { displayName, photoURL, email });
  return { userId, displayName, email, photoURL };
}
