import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  Timestamp,
} from 'firebase/firestore';

import { db } from '@/api/firebaseApp';

export interface CommentModel {
  id: string;
  userId: string;
  content: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export const createComment = async (
  postId: string,
  userId: string,
  content: string,
): Promise<string> => {
  const postDoc = doc(db, 'posts', postId);
  const commentsCollection = collection(postDoc, 'comments');

  const newComment = {
    userId,
    content,
    createdAt: Timestamp.now(),
  };

  const docRef = await addDoc(commentsCollection, newComment);
  return docRef.id;
};

export const getCommentById = async (postId: string, commentId: string): Promise<CommentModel> => {
  const commentDoc = doc(db, 'posts', postId, 'comments', commentId);
  const commentSnapshot = await getDoc(commentDoc);

  if (!commentSnapshot.exists()) {
    throw new Error('Comment not found');
  }

  return { id: commentSnapshot.id, ...commentSnapshot.data() } as CommentModel;
};

export const getComments = async (
  postId: string,
  count: number = 10,
  lastCommentId?: string,
): Promise<CommentModel[]> => {
  const commentsCollection = collection(db, 'posts', postId, 'comments');
  let q = query(commentsCollection, orderBy('createdAt', 'desc'), limit(count));

  if (lastCommentId) {
    const lastCommentDoc = await getDoc(doc(commentsCollection, lastCommentId));
    if (lastCommentDoc.exists()) {
      q = query(q, startAfter(lastCommentDoc));
    }
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as CommentModel);
};

export const updateComment = async (
  postId: string,
  commentId: string,
  content: string,
): Promise<void> => {
  const commentDoc = doc(db, 'posts', postId, 'comments', commentId);
  await updateDoc(commentDoc, { content, updatedAt: Timestamp.now() });
};

export const deleteComment = async (postId: string, commentId: string): Promise<void> => {
  const commentDoc = doc(db, 'posts', postId, 'comments', commentId);
  await deleteDoc(commentDoc);
};
