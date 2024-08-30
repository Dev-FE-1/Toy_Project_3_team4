import * as express from 'express';

import { CommentService } from '../services/commentService';

const router = express.Router();
const commentService = new CommentService();

export class CommentDto {
  postId!: string;
  userId!: string;
  content!: string;
}

router.post('/', async (req, res) => {
  try {
    const { postId, userId, content } = req.body;
    const newComment = await commentService.addComment({ postId, userId, content } as CommentDto);
    res.json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating comment');
  }
});

router.get('/', async (req, res) => {
  try {
    const comments = await commentService.getCommentsByPostId(req.query.postId as string);
    if (!comments) {
      res.status(404).send('Comments not found');
      return;
    }
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching comments');
  }
});

export default router;
