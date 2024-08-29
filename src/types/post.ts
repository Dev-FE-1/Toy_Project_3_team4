export interface PostModel {
  postId: string;
  userId: string;
  userName: string;
  userImgUrl: string;
  playlistId: string;
  playlistName: string;
  content: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
  video: Video;
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
