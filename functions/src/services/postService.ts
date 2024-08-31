import { getRepository } from 'fireorm';

import { getFirestore } from '../firebase';
import { posts, users } from '../models/models';

export class PostService {
  private postRepository: ReturnType<typeof getRepository<posts>>;
  private userRepository: ReturnType<typeof getRepository<users>>;

  constructor() {
    getFirestore();
    this.postRepository = getRepository(posts);
    this.userRepository = getRepository(users);
  }

  async createPost({
    playlistId,
    content,
    userId,
    video,
  }: {
    playlistId: string | null;
    content: string;
    userId: string;
    video: string;
  }): Promise<posts> {
    const newPost = new posts();
    newPost.playlistId = playlistId || '';
    newPost.content = content || '';
    newPost.createdAt = new Date();
    newPost.video = video;
    if (!userId) {
      throw new Error('User id is required');
    }
    newPost.userId = userId;
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
    } else {
      // 이미 좋아요를 누른 경우
      // 좋아요 취소
      post.likes = post.likes.filter((id) => id !== userId);
      await this.postRepository.update(post);
    }
  }

  async getPostsByUser(limit = 10, userId: string, lastPostId?: string): Promise<posts[]> {
    let query = this.postRepository.whereEqualTo('userId', userId).orderByDescending('createdAt');

    console.log('lastPostId', lastPostId);
    if (lastPostId) {
      const lastPost = await this.postRepository.findById(lastPostId);
      if (lastPost) {
        query = query.whereLessThan('createdAt', lastPost.createdAt);
      } else {
        console.warn(`Last post with id ${lastPostId} not found.`);
      }
    }

    query = query.limit(limit);
    const result = await query.find();
    console.log('getPostsByUser result', result);
    return result;
  }

  async getPosts({
    userId,
    limit,
    lastPostId,
  }: {
    userId?: string;
    limit: number;
    lastPostId?: string;
  }): Promise<posts[]> {
    let query = this.postRepository.orderByDescending('createdAt');
    if (userId) {
      query = query.whereEqualTo('userId', userId);
    }

    if (lastPostId) {
      const lastPost = await this.postRepository.findById(lastPostId);
      if (lastPost) {
        query = query.whereLessThan('createdAt', lastPost.createdAt);
      } else {
        console.warn(`Last post with id ${lastPostId} not found.`);
      }
    }

    query = query.limit(limit);
    return await query.find();
  }

  private async getFollowingUsers(userId: string): Promise<string[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      console.warn('User not found');
      return [];
    }
    return user.following || [];
  }
  async getPostsByFollowedUsers(
    userId: string,
    limit = 100,
    lastPostId?: string,
  ): Promise<posts[]> {
    const followingUsers = await this.getFollowingUsers(userId);
    if (followingUsers.length === 0) {
      return [];
    }

    let query = this.postRepository
      .whereIn('userId', followingUsers)
      .orderByDescending('createdAt')
      .limit(limit);

    if (lastPostId) {
      const lastPost = await this.postRepository.findById(lastPostId);
      if (lastPost) {
        query = query.whereLessThan('createdAt', lastPost.createdAt);
      } else {
        console.warn(`Last post with id ${lastPostId} not found.`);
      }
    }
    return await query.find();
  }

  // 타임라인 기능 구현
  async getTimelinePosts(userId: string, limit = 100, lastPostId?: string): Promise<posts[]> {
    try {
      const userPosts = await this.getPostsByUser(limit, userId, lastPostId);
      const followedUsersPosts = await this.getPostsByFollowedUsers(userId, limit, lastPostId);
      const allPosts = [...userPosts, ...followedUsersPosts];
      allPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      return allPosts.slice(0, limit);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getPostsByIds(postIds: string[]): Promise<posts[]> {
    return await this.postRepository.whereIn('id', postIds).find();
  }

  async updatePost({
    postId,
    userId,
    content,
    playlistId,
    video,
  }: {
    postId: string;
    userId: string;
    content?: string;
    playlistId?: string;
    video?: string;
  }): Promise<posts> {
    if (!postId || typeof postId !== 'string' || postId.trim() === '') {
      throw new Error('Invalid postId');
    }

    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    if (post.userId !== userId) {
      throw new Error('User is not the owner of the post');
    }

    post.content = post.content ?? '';
    post.playlistId = post.playlistId ?? '';
    post.video = post.video ?? '';

    if (content !== undefined) post.content = content;
    if (playlistId !== undefined) post.playlistId = playlistId;
    if (video !== undefined) post.video = video;

    return await this.postRepository.update(post);
  }

  async deletePost(postId: string, userId: string): Promise<string> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    if (post.userId !== userId) {
      throw new Error('User is not the owner of the post');
    }

    await this.postRepository.delete(postId);
    return postId;
  }
}
