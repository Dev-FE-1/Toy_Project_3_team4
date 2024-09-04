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
  userId: string;
  title: string;
  videoUrl: string;
  uploadDate: string;
  thumbnailUrl: string;
  views: string;
  creator: string;
}

export interface DraggableVideoModel extends VideoModel {
  id: string | number;
}
