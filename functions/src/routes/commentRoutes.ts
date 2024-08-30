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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, content } = req.body;

  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    return res.status(400).send('Invalid userId');
  }

  try {
    const comment = await commentService.updateComment({ id, userId, content });
    return res.json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error updating comment');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    return res.status(400).send('Invalid userId');
  }

  try {
    await commentService.deleteComment({ id, userId });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error deleting comment');
  }
});

export default router;
