import { Timestamp } from 'firebase/firestore';

export interface CommentModel {
  id: string;
  userId: string;
  content: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  parentCommentId?: string;
}
