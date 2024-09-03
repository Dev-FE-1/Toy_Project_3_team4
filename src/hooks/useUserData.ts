import { useCallback, useEffect, useState } from 'react';

import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { UserData } from '@/types/profile';

interface UseUserDataReturn {
  userData: UserData | null;
  following: string[];
  followingUsers: UserData[];
  followerUsers: UserData[];
  updateUserData: (newData: Partial<UserData>) => Promise<void>;
  toggleFollow: (currentUserId: string, targetUserId: string) => Promise<void>;
}

export const useUserData = (userId: string | null): UseUserDataReturn => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [followingUsers, setFollowingUsers] = useState<UserData[]>([]);
  const [followerUsers, setFollowerUsers] = useState<UserData[]>([]);
  // const [loading, setLoading] = useState(true);

  const getUserData = useCallback(async (userId: string): Promise<UserData | null> => {
    try {
      const userDoc = doc(db, 'users', userId);
      const docSnapshot = await getDoc(userDoc);
      if (docSnapshot.exists()) {
        return docSnapshot.data() as UserData;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        // setLoading(false);
        return;
      }
      try {
        const userDoc = doc(db, 'users', userId);
        const docSnapshot = await getDoc(userDoc);
        if (docSnapshot.exists()) {
          const user = docSnapshot.data() as UserData;
          setUserData(user);

          const followingData = await Promise.all(
            (user.following || []).map((id) => getUserData(id)),
          );
          setFollowingUsers(followingData.filter(Boolean) as UserData[]);

          // Fetch follower users
          const followerData = await Promise.all(
            (user.followers || []).map((id) => getUserData(id)),
          );
          setFollowerUsers(followerData.filter(Boolean) as UserData[]);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      // finally {
      //   setLoading(false);
      // }
    };

    fetchUserData();
  }, [userId, getUserData]);

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

  const defaultUserData: UserData = {
    displayName: 'Unknown',
    photoURL: 'default-avatar.png',
    bio: '',
    followers: [],
    following: [],
    uid: '',
  };

  return {
    userData: userData || defaultUserData,
    following: userData?.following || [],
    followingUsers,
    followerUsers,
    updateUserData,
    toggleFollow,
  };
};
