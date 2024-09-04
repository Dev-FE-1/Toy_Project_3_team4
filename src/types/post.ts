import { Timestamp } from 'firebase/firestore';

export interface PostModel {
  postId: string;
  userId: string;
  playlistId: string;
  playlistName: string;
  content: string;
  createdAt: Timestamp;
  likes: string[];
  comments: Comment[];
  video: string;
}

export interface Comment {
  commentId: string;
  userId: string;
  content: string;
  likes: string;
}

export interface Video {
  videoId: string;
  title: string;
  videoUrl: string;
}
