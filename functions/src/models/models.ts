// src/models/post.ts
import { Collection } from 'fireorm';

@Collection()
export class User {
  id!: string;
  displayName!: string;
  email!: string;
  profileImage?: string;
  bio?: string;
  subscriptions?: string[];
  followers?: string[];
  following?: string[];
}

@Collection()
export class Post {
  id!: string;
  userId!: string;
  playlistId!: string;
  content!: string;
  createdAt!: Date;
  likes?: string[];
}

@Collection()
export class Playlist {
  id!: string;
  userId!: string;
  title!: string;
  description?: string;
  createdAt!: Date;
  isPublic!: boolean;
  videos?: string[];
}

@Collection()
export class Notification {
  id!: string;
  userId!: string;
  type!: string;
  relatedUserId!: string;
  createdAt!: Date;
  isRead!: boolean;
}

@Collection()
export class Video {
  id!: string;
  userId!: string;
  title!: string;
  videoUrl!: string;
  uploadDate!: Date;
  thumbnailUrl!: string;
  views!: number;
  creater!: string;
}

@Collection()
export class Comment {
  id!: string;
  userId!: string;
  content!: string;
  createdAt!: Date;
  likes!: string[];
}
