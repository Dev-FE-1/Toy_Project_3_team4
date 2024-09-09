import { Timestamp } from 'firebase/firestore';

import { CommentModel } from '@/types/comment';

export interface PostModel {
  postId: string;
  userId: string;
  playlistId: string;
  playlistName: string;
  content: string;
  createdAt: Timestamp;
  likes: string[];
  comments: CommentModel;
  video: string;
}

export interface Video {
  videoId: string;
  title: string;
  videoUrl: string;
}
