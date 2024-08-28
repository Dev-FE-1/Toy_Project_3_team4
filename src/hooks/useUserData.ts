import { useEffect, useState } from 'react';

import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { UserData } from '@/types/profile';

export const useUserData = (userId: string | null) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      const userDoc = doc(db, 'users', userId);
      const docSnapshot = await getDoc(userDoc);
      if (docSnapshot.exists()) {
        setUserData(docSnapshot.data() as UserData);
      }
    };

    fetchUserData();
  }, [userId]);

  const updateUserData = async (newData: Partial<UserData>) => {
    if (!userId) return;
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, newData);
    setUserData((prevData) => ({ ...prevData, ...newData }) as UserData);
  };

  return { userData, updateUserData };
};
