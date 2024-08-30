import { useEffect, useState } from 'react';

import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { UserData } from '@/types/profile';

interface UseUserDataReturn {
  userData: UserData | null;
  following: string[];
  updateUserData: (newData: Partial<UserData>) => Promise<void>;
  toggleFollow: (currentUserId: string, targetUserId: string) => Promise<void>;
}

export const useUserData = (userId: string | null): UseUserDataReturn => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const userDoc = doc(db, 'users', userId);
        const docSnapshot = await getDoc(userDoc);
        if (docSnapshot.exists()) {
          setUserData(docSnapshot.data() as UserData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const updateUserData = async (newData: Partial<UserData>) => {
    if (!userId) return;
    try {
      const userDoc = doc(db, 'users', userId);
      await updateDoc(userDoc, newData);
      setUserData((prevData) => ({ ...prevData, ...newData }) as UserData);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const toggleFollow = async (currentUserId: string, targetUserId: string) => {
    try {
      const currentUserDoc = doc(db, 'users', currentUserId);
      const targetUserDoc = doc(db, 'users', targetUserId);

      const currentUserSnapshot = await getDoc(currentUserDoc);
      const currentUserData = currentUserSnapshot.data() as UserData;
      const isFollowing = currentUserData.following?.includes(targetUserId) || false;

      if (isFollowing) {
        await updateDoc(currentUserDoc, {
          following: arrayRemove(targetUserId),
        });
        await updateDoc(targetUserDoc, {
          followers: arrayRemove(currentUserId),
        });
      } else {
        await updateDoc(currentUserDoc, {
          following: arrayUnion(targetUserId),
        });
        await updateDoc(targetUserDoc, {
          followers: arrayUnion(currentUserId),
        });
      }

      if (userId === targetUserId) {
        const updatedUserDoc = await getDoc(targetUserDoc);
        setUserData(updatedUserDoc.data() as UserData);
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  return {
    userData: userData || { displayName: 'Unknown', photoURL: 'default-avatar.png' },
    updateUserData,
    toggleFollow,
  };
};
