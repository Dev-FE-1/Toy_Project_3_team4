import { useCallback, useEffect, useState } from 'react';

import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import defaultImage from '@/assets/images/default-avatar.svg';
import { UserData } from '@/types/profile';

interface UseUserDataReturn {
  userData: UserData | null;
  following: string[];
  followingUsers: UserData[];
  followerUsers: UserData[];
  updateUserData: (newData: Partial<UserData>) => Promise<void>;
  toggleFollow: (currentUserId: string, targetUserId: string) => Promise<void>;
  refetchUserData: () => Promise<void>;
  isFollowing: (targetUserId: string) => boolean;
}

export const useUserData = (userId: string | null): UseUserDataReturn => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [followingUsers, setFollowingUsers] = useState<UserData[]>([]);
  const [followerUsers, setFollowerUsers] = useState<UserData[]>([]);

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

  const fetchUserData = useCallback(async () => {
    if (!userId) return;
    try {
      const userDoc = doc(db, 'users', userId);
      const docSnapshot = await getDoc(userDoc);
      if (docSnapshot.exists()) {
        const user = docSnapshot.data() as UserData;
        setUserData(user);

        const followingData = await Promise.all(
          (user.following || []).map((id) => getUserData(id)),
        );
        console.log('Fetched following users:', followingData);
        setFollowingUsers(followingData.filter(Boolean) as UserData[]);

        const followerData = await Promise.all((user.followers || []).map((id) => getUserData(id)));
        console.log('Fetched follower users:', followerData);
        setFollowerUsers(followerData.filter(Boolean) as UserData[]);
      } else {
        console.log('User document does not exist');
        setUserData(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [userId, getUserData]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

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
    if (!currentUserId || !targetUserId) {
      console.error('Invalid user IDs', currentUserId, targetUserId);
      return;
    }
    try {
      const currentUserDoc = doc(db, 'users', currentUserId);
      const targetUserDoc = doc(db, 'users', targetUserId);

      const currentUserSnapshot = await getDoc(currentUserDoc);
      if (!currentUserSnapshot.exists()) {
        console.error('Current user document does not exist');
        return;
      }
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

      await fetchUserData();
      // fetchUserData();
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const isFollowing = useCallback(
    (targetUserId: string) => {
      return userData?.following?.includes(targetUserId) || false;
    },
    [userData],
  );

  const refetchUserData = useCallback(async () => {
    await fetchUserData();
  }, [fetchUserData]);

  const defaultUserData: UserData = {
    displayName: 'Unknown',
    photoURL: defaultImage,
    bio: '',
    followers: [],
    following: [],
    uid: '',
    userId: '',
  };

  return {
    userData: userData || defaultUserData,
    following: userData?.following || [],
    followingUsers,
    followerUsers,
    updateUserData,
    toggleFollow,
    refetchUserData,
    isFollowing,
  };
};
