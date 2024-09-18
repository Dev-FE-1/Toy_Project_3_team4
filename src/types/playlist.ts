import { Timestamp } from 'firebase/firestore';
export interface PlaylistModel {
  playlistId: string;
  userId: string;
  title: string;
  createdAt: Timestamp;
  isPublic: boolean;
  videos: VideoModel[];
}

export interface VideoModel {
  videoId: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export interface YoutubeVideoModel {
  title: string;
  creator: string;
  views: number;
  uploadDate: string;
}
