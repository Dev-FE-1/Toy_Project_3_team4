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
} from 'firebase/firestore';

import { db } from '@/api/firebaseApp';
import { PostModel } from '@/types/post';

const postsCollection = collection(db, 'posts');

export async function getPostsFilterdLikes({
  userId,
  count = 10,
  lastPostId,
}: {
  userId: string;
  count?: number;
  lastPostId?: string;
}): Promise<PostModel[]> {
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
}

export async function getPostsByUserId({
  userId,
  count = 10,
  lastPostId,
}: {
  userId: string;
  count?: number;
  lastPostId?: string;
}): Promise<PostModel[]> {
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
}

export async function getPostsByFollowingUsers({
  userId,
  count = 100,
  lastPostId,
}: {
  userId: string;
  count?: number;
  lastPostId?: string;
}): Promise<PostModel[]> {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (!userDoc.exists()) {
    console.warn('User not found');
    return [];
  }

  const followingUserIds = userDoc.data().following;
  if (!followingUserIds || followingUserIds.length === 0) {
    console.warn('No following users');
    return [];
  }

  let q = query(
    postsCollection,
    orderBy('createdAt', 'desc'),
    where('userId', 'in', followingUserIds),
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
}

export async function getPosts({
  count = 10,
  lastPostId,
}: {
  count?: number;
  lastPostId?: string;
}): Promise<PostModel[]> {
  let q = query(postsCollection, orderBy('createdAt', 'desc'), limit(count));

  if (lastPostId) {
    const lastPostDoc = await getDoc(doc(postsCollection, lastPostId));
    if (lastPostDoc.exists()) {
      q = query(q, startAfter(lastPostDoc));
    }
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ postId: doc.id, ...doc.data() }) as PostModel);
}

export async function getPostsTimelinesSorted({
  userId,
  count = 20,
  lastPostId,
}: {
  userId: string;
  count?: number;
  lastPostId?: string;
}): Promise<PostModel[]> {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (!userDoc.exists()) {
    console.warn('User not found');
    return [];
  }

  const followingUserIds = userDoc.data()?.following || [];
  if (!followingUserIds || followingUserIds.length === 0) {
    console.warn('No following users');
    return [];
  }

  let followingPostsQuery = query(
    postsCollection,
    where('userId', 'in', [userId, ...followingUserIds]),
    orderBy('createdAt', 'desc'),
    limit(count),
  );

  if (lastPostId) {
    const lastPostDoc = await getDoc(doc(postsCollection, lastPostId));
    if (lastPostDoc.exists()) {
      followingPostsQuery = query(followingPostsQuery, startAfter(lastPostDoc));
    }
  }

  const followingPostsSnapshot = await getDocs(followingPostsQuery);
  const followingPosts = followingPostsSnapshot.docs.map(
    (doc) => ({ postId: doc.id, ...doc.data() }) as PostModel,
  );

  if (followingPosts.length < count) {
    const remainingCount = count - followingPosts.length;
    const lastFollowingPost = followingPosts[followingPosts.length - 1];

    let otherPostsQuery = query(
      postsCollection,
      where('userId', 'not-in', [userId, ...followingUserIds]),
      orderBy('createdAt', 'desc'),
      limit(remainingCount),
    );

    if (lastFollowingPost) {
      otherPostsQuery = query(otherPostsQuery, startAfter(lastFollowingPost.createdAt));
    }

    const otherPostsSnapshot = await getDocs(otherPostsQuery);
    const otherPosts = otherPostsSnapshot.docs.map(
      (doc) => ({ postId: doc.id, ...doc.data() }) as PostModel,
    );

    return [...followingPosts, ...otherPosts];
  }

  return followingPosts;
}
