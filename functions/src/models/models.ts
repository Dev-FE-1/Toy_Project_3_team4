// src/models/post.ts
import { Collection } from 'fireorm';

@Collection()
export class users {
  id!: string;
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
  userId!: string;
  playlistId?: string;
  content!: string;
  createdAt!: Date;
  likes?: string[];
  video!: string;
}

@Collection()
export class playlists {
  id!: string;
  userId!: string;
  title!: string;
  createdAt!: Date;
  isPublic!: boolean;
  videos?: string[];
}

@Collection()
export class notifications {
  id!: string;
  userId!: string;
  type!: string;
  relatedUserId!: string;
  createdAt!: Date;
  isRead!: boolean;
}

@Collection()
export class videos {
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
export class comments {
  id!: string;
  userId!: string;
  content!: string;
  createdAt!: Date;
  likes!: string[];
  postId!: string;
  replies?: string[];
}
