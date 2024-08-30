// src/routes/postRoutes.ts
import * as express from 'express';

import { PostService } from '../services/postService';

const router = express.Router();

const postService = new PostService();

export class CreatePostDto {
  userId!: string;
  playlistId!: string;
  content!: string;
  video!: string;
}

router.post('/', async (req, res) => {
  try {
    const { playlistId = null, content, video, userId } = req.body as CreatePostDto;
    const newPost = await postService.createPost({ playlistId, content, userId, video });
    res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating post');
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId as string | undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
    const lastPostId = req.query.lastPostId as string | undefined;
    const posts = await postService.getPosts({ userId, limit, lastPostId });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching posts');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await postService.getPostsByIds([req.params.id]);
    if (post) {
      res.json(post);
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching post');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, content, playlistId, video } = req.body;

  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    return res.status(400).send('Invalid userId');
  }

  if (!id || typeof id !== 'string' || id.trim() === '') {
    return res.status(400).send('Invalid postId');
  }

  try {
    const updatedPost = await postService.updatePost({
      postId: id,
      userId,
      content,
      playlistId,
      video,
    });
    res.json(updatedPost);
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'Invalid postId':
        case 'Post not found':
          return res.status(404).send(error.message);
        case 'User is not the owner of the post':
          return res.status(403).send(error.message);
        default:
          return res.status(500).send('Error updating post');
      }
    }
    res.status(500).send('Error updating post');
    return;
  }
  return;
});

router.delete('/:id', async (req, res) => {
  try {
    await postService.deletePost(req.params.id, req.body.userId);
    res.send('Post deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting post');
  }
});

router.post('/:id/like', async (req, res) => {
  try {
    await postService.likePost(req.params.id, req.body.userId);
    res.send('Post liked');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error liking post');
  }
});

export default router;
