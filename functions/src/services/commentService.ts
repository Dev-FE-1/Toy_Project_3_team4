import { getRepository } from 'fireorm';

import { getFirestore } from '../firebase';
import { Comment } from '../models/models';

export class CommentService {
  private commentRepository: ReturnType<typeof getRepository<Comment>>;

  constructor() {
    getFirestore();
    this.commentRepository = getRepository(Comment);
  }

  async addComment(postId: string, userId: string, content: string): Promise<Comment> {
    const newComment = new Comment();
    newComment.postId = postId;
    newComment.userId = userId;
    newComment.content = content;
    newComment.createdAt = new Date();
    newComment.likes = [];

    return await this.commentRepository.create(newComment);
  }

  async getCommentsByPostId(postId: string): Promise<Comment[]> {
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
