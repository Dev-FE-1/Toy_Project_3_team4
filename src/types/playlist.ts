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

export interface DraggableVideoModel extends VideoModel {
  id: string | number;
}
