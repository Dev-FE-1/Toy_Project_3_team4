import { useCallback, useEffect, useState } from 'react';

import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import defaultImage from '@/assets/images/default-avatar.svg';
import { useAuth } from '@/hooks/useAuth';
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
  const [localFollowing, setLocalFollowing] = useState<string[]>([]);

  const currentUser = useAuth();
  const currentUserId = currentUser?.uid;

  const getUserData = useCallback(async (id: string): Promise<UserData | null> => {
    try {
      const userDoc = doc(db, 'users', id);
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
      const user = await getUserData(userId);
      if (user) {
        setUserData(user);
        const followingData = await Promise.all(
          (user.following || []).map((id) => getUserData(id)),
        );
        setFollowingUsers(followingData.filter(Boolean) as UserData[]);

        const followerData = await Promise.all((user.followers || []).map((id) => getUserData(id)));
        setFollowerUsers(followerData.filter(Boolean) as UserData[]);
      } else {
        console.log('User document does not exist');
        setUserData(null);
      }

      if (currentUserId && currentUserId !== userId) {
        const currentUser = await getUserData(currentUserId);
        if (currentUser) {
          setLocalFollowing(currentUser.following || []);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [userId, currentUserId, getUserData]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (userData && (!currentUserId || currentUserId === userId)) {
      setLocalFollowing(userData.following || []);
    }
  }, [userData, currentUserId, userId]);

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

      const isFollowing = localFollowing.includes(targetUserId);

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

      setLocalFollowing((prev) =>
        isFollowing ? prev.filter((id) => id !== targetUserId) : [...prev, targetUserId],
      );

      if (userId === currentUserId) {
        setUserData((prevData) => {
          if (!prevData) return null;
          return {
            ...prevData,
            following: isFollowing
              ? prevData.following?.filter((id) => id !== targetUserId)
              : [...(prevData.following as []), targetUserId],
          };
        });
      } else if (userId === targetUserId) {
        setUserData((prevData) => {
          if (!prevData) return null;
          return {
            ...prevData,
            followers: isFollowing
              ? prevData.followers?.filter((id) => id !== currentUserId)
              : [...(prevData.followers as []), currentUserId],
          };
        });
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const isFollowing = useCallback(
    (targetUserId: string) => {
      return localFollowing.includes(targetUserId);
    },
    [localFollowing],
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
    following: localFollowing,
    followingUsers,
    followerUsers,
    updateUserData,
    toggleFollow,
    refetchUserData,
    isFollowing,
  };
};
