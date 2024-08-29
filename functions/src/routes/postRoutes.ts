// src/routes/postRoutes.ts
import * as express from 'express';

import { PostService } from '../services/postService';

const router = express.Router();

const postService = new PostService();

export class CreatePostDto {
  userId!: string;
  playlistId!: string;
  content!: string;
}

router.get('/', async (req, res) => {
  try {
    const posts = await postService.getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).send('Error fetching posts');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await postService.getPostsByIds([req.params.id]);
    res.json(post);
  } catch (error) {
    res.status(400).send('Post not found');
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, playlistId, content } = req.body as CreatePostDto;
    const newPost = await postService.createPost(userId, playlistId, content);
    res.json(newPost);
  } catch (error) {
    res.status(500).send('Error creating post');
  }
});

export default router;
