// src/models/post.ts
import { Collection } from 'fireorm';

@Collection()
export class users {
  id!: string;
  userId!: string;
  displayName!: string;
  email!: string;
  photoURL?: string;
  bio?: string;
  subscriptions?: string[];
  followers?: string[];
  following?: string[];
}

@Collection()
export class posts {
  id!: string;
  postId!: string;
  userId!: string;
  playlistId?: string;
  content!: string;
  createdAt!: Date;
  comments?: string[];
  likes?: string[];
  video?: string;
}

export class videos {
  id!: string;
  videoId!: string;
  videoUrl!: string;
  thumbnailUrl!: string;
}

@Collection()
export class playlists {
  id!: string;
  playlistId!: string;
  userId!: string;
  title!: string;
  createdAt!: Date;
  isPublic!: boolean;
  videos?: videos[];
}

@Collection()
export class comments {
  id!: string;
  commentId!: string;
  userId!: string;
  content!: string;
  createdAt!: Date;
  likes!: string[];
  postId!: string;
  replies?: string[];
}

@Collection()
export class replies {
  id!: string;
  replyId!: string;
  commentId!: string;
  createdAt!: Date;
  content!: string;
}
