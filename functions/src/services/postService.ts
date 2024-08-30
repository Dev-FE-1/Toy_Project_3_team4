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
    }
  }

  async getPostsByUser(limit = 10, userId: string, lastPostId?: string): Promise<posts[]> {
    let query = this.postRepository.whereEqualTo('userId', userId).orderByDescending('createdAt');

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

  async getPosts(limit = 100, lastPostId?: string): Promise<posts[]> {
    let query = this.postRepository.orderByDescending('createdAt');

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

  // 팔로우한 유저들의 포스트들을 가져옴.
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
  // 우선 유저가 팔로우한 유저들의 포스트들, 그리고 유저의 포스트들을 가져옴. 각 포스트들은 시간순으로 정렬
  // 이후 lastPostId가 주어진 경우, 해당 포스트 이후의 포스트들을 가져옴.
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
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    if (post.userId !== userId) {
      throw new Error('User is not the owner of the post');
    }

    if (!post.content) {
      post.content = '';
    }
    if (!post.playlistId) {
      post.playlistId = '';
    }
    if (!post.video) {
      post.video = '';
    }

    post.content = content || post.content;
    post.playlistId = playlistId || post.playlistId;
    post.video = video || post.video;

    return await this.postRepository.update(post);
  }

  async deletePost(postId: string, userId: string): Promise<void> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    if (post.userId !== userId) {
      throw new Error('User is not the owner of the post');
    }

    await this.postRepository.delete(postId);
  }
}
