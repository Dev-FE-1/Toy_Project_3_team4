import { getRepository } from 'fireorm';

import { getFirestore } from '../firebase';
import { Post } from '../models/models';

export class PostService {
  private postRepository: ReturnType<typeof getRepository<Post>>;

  constructor() {
    getFirestore();
    this.postRepository = getRepository(Post);
  }

  async createPost(userId: string, playlistId: string, content: string): Promise<Post> {
    const newPost = new Post();
    newPost.userId = userId;
    newPost.playlistId = playlistId;
    newPost.content = content;
    newPost.createdAt = new Date();
    newPost.likes = [];

    return await this.postRepository.create(newPost);
  }

  async likePost(postId: string, userId: string): Promise<void> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    if (!post.likes) {
      post.likes = [];
    }

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await this.postRepository.update(post);
    }
  }

  async getPosts(limit = 10, lastPostId?: string): Promise<Post[]> {
    let query = this.postRepository.orderByDescending('createdAt');

    if (lastPostId) {
      const lastPost = await this.postRepository.findById(lastPostId);
      if (lastPost) {
        query = query.whereGreaterThan('createdAt', lastPost.createdAt);
      } else {
        console.warn(`Last post with id ${lastPostId} not found.`);
      }
    }

    query = query.limit(limit);
    return await query.find();
  }

  async getPostsByIds(postIds: string[]): Promise<Post[]> {
    return await this.postRepository.whereIn('id', postIds).find();
  }
}
