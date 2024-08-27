export interface PlaylistModel {
  playlistId: string;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
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
  views?: string;
}
