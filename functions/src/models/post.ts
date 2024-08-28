// src/models/post.ts
import { Collection } from 'fireorm';

@Collection()
export class Post {
  id!: string;
  title!: string;
  content!: string;
  createdAt!: Date;
}
