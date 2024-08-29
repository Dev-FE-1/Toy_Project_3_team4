import { getRepository } from 'fireorm';

import { Post, Comment } from '../models/models';

export class PostService {
  // private postRepository = getRepository(Post);
  // private commentRepository = getRepository(Comment);

  async createPost(userId: string, playlistId: string, content: string): Promise<Post> {
    const postRepository = getRepository(Post);
    const newPost = new Post();
    newPost.userId = userId;
    newPost.playlistId = playlistId;
    newPost.content = content;
    newPost.createdAt = new Date();
    newPost.likes = [];

    return await postRepository.create(newPost);
  }

  async likePost(postId: string, userId: string): Promise<void> {
    const postRepository = getRepository(Post);
    const post = await postRepository.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    if (!post.likes) {
      post.likes = [];
    }

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await postRepository.update(post);
    }
  }

  async addComment(postId: string, userId: string, content: string): Promise<Comment> {
    const postRepository = getRepository(Post);
    const commentRepository = getRepository(Comment);
    const post = await postRepository.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    const newComment = new Comment();
    newComment.userId = userId;
    newComment.content = content;
    newComment.createdAt = new Date();
    newComment.likes = [];

    return await commentRepository.create(newComment);
  }

  async getPosts(limit = 10, lastPostId?: string): Promise<Post[]> {
    const postRepository = getRepository(Post);
    let query = postRepository.orderByDescending('createdAt');

    if (lastPostId) {
      const lastPost = await postRepository.findById(lastPostId);
      if (lastPost) {
        query = query.whereGreaterThan('createdAt', lastPost.createdAt);
      } else {
        console.warn(`Last post with id ${lastPostId} not found.`);
      }
    }

    query = query.limit(limit);
    const result = await query.find();
    console.log('result', result);
    return result;
  }

  async getPostsByIds(postIds: string[]): Promise<Post[]> {
    const postRepository = getRepository(Post);
    return await postRepository.whereIn('id', postIds).find();
  }
}
