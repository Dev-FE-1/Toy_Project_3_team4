import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  updateDoc,
} from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { PostModel } from '@/types/post';

const postsCollection = collection(db, 'posts');

export const getPostByPostId = async ({ postId }: { postId: string }): Promise<PostModel> => {
  const postDoc = doc(postsCollection, postId);
  const postDocSnapshot = await getDoc(postDoc);
  return { postId: postDocSnapshot.id, ...postDocSnapshot.data() } as PostModel;
};

export const getPostsFilteredLikes = async ({
  userId,
  count = 10,
  lastPostId,
}: {
  userId: string;
  count?: number;
  lastPostId?: string;
}): Promise<PostModel[]> => {
  let q = query(
    postsCollection,
    where('likes', 'array-contains', userId),
    orderBy('createdAt', 'desc'),
    limit(count),
  );

  if (lastPostId) {
    const lastPostDoc = await getDoc(doc(postsCollection, lastPostId));
    if (lastPostDoc.exists()) {
      q = query(q, startAfter(lastPostDoc));
    }
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ postId: doc.id, ...doc.data() }) as PostModel);
};

export const getPostsByUserId = async ({
  userId,
  count = 10,
  lastPostId,
}: {
  userId: string;
  count?: number;
  lastPostId?: string;
}): Promise<PostModel[]> => {
  let q = query(
    postsCollection,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(count),
  );

  if (lastPostId) {
    const lastPostDoc = await getDoc(doc(postsCollection, lastPostId));
    if (lastPostDoc.exists()) {
      q = query(q, startAfter(lastPostDoc));
    }
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ postId: doc.id, ...doc.data() }) as PostModel);
};

export const getPostsByNonFollowingUsers = async ({
  userId,
  count = 10,
  lastPostId,
}: {
  userId: string;
  count?: number;
  lastPostId?: string;
}): Promise<PostModel[]> => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (!userDoc.exists()) {
    console.warn('User not found');
    return [];
  }

  const followingUserIds = userDoc.data().following || [];

  const excludedUserIds = [userId, ...followingUserIds];

  let q = query(
    postsCollection,
    orderBy('createdAt', 'desc'),
    where('userId', 'not-in', excludedUserIds),
    limit(count),
  );

  if (lastPostId) {
    const lastPostDoc = await getDoc(doc(postsCollection, lastPostId));
    if (lastPostDoc.exists()) {
      q = query(q, startAfter(lastPostDoc));
    }
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ postId: doc.id, ...doc.data() }) as PostModel);
};

export const getPostsByFollowingUsers = async ({
  userId,
  count = 10,
  lastPostId,
}: {
  userId: string;
  count?: number;
  lastPostId?: string;
}): Promise<PostModel[]> => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (!userDoc.exists()) {
    console.warn('User not found');
    return [];
  }

  const followingUserIds = userDoc.data().following ?? [];

  let q = query(
    postsCollection,
    orderBy('createdAt', 'desc'),
    where('userId', 'in', [userId, ...followingUserIds]),
    limit(count),
  );

  if (lastPostId) {
    const lastPostDoc = await getDoc(doc(postsCollection, lastPostId));
    if (lastPostDoc.exists()) {
      q = query(q, startAfter(lastPostDoc));
    }
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ postId: doc.id, ...doc.data() }) as PostModel);
};

export const updatePostsLikes = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}): Promise<void> => {
  const postRef = doc(postsCollection, postId);
  const postSnap = await getDoc(postRef);

  if (!postSnap.exists()) {
    console.warn('Post not found');
    return;
  }

  const postData = postSnap.data();
  const currentLikes = postData.likes;

  if (postData.likes.includes(userId)) {
    const updatedLikes = currentLikes.filter((userLike: string) => userLike !== userId);
    await updateDoc(postRef, { likes: updatedLikes });
  } else {
    const updatedLikes = [...currentLikes, userId];
    await updateDoc(postRef, { likes: updatedLikes });
  }
};

export const fetchMultiplePostsByPostIds = async (postIds: string[]) => {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('__name__', 'in', postIds));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data());
};
