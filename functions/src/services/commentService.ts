import { getRepository } from 'fireorm';

import { getFirestore } from '../firebase';
import { comments, posts } from '../models/models';

export class CommentService {
  private commentRepository: ReturnType<typeof getRepository<comments>>;

  constructor() {
    getFirestore();
    this.commentRepository = getRepository(comments);
  }

  async addComment({
    postId,
    userId,
    content,
  }: {
    postId: string;
    userId: string;
    content: string;
  }): Promise<comments> {
    const newComment = new comments();
    const post = await getRepository(posts).findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    newComment.postId = postId;
    newComment.userId = userId;
    newComment.content = content;
    newComment.createdAt = new Date();
    newComment.replies = [];
    newComment.likes = [];

    return await this.commentRepository.create(newComment);
  }

  async getCommentsByPostId(postId: string): Promise<comments[]> {
    return await this.commentRepository.whereEqualTo('postId', postId).find();
  }

  async likeComment(commentId: string, userId: string): Promise<void> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }

    if (!comment.likes) {
      comment.likes = [];
    }

    if (!comment.likes.includes(userId)) {
      comment.likes.push(userId);
      await this.commentRepository.update(comment);
    }
  }
}
