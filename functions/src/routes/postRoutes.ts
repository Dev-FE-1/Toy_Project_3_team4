// src/routes/postRoutes.ts
import * as express from 'express';
import { getRepository } from 'fireorm';

import { Post } from '../models/models';

const router = express.Router();

export class CreatePostDto {
  userId!: string;
  playlistId!: string;
  content!: string;
}

router.get('/', async (req, res) => {
  const postRepository = getRepository(Post);
  const posts = await postRepository.find();
  res.json(posts);
});

router.get('/:id', async (req, res) => {
  const postRepository = getRepository(Post);
  const post = await postRepository.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

router.post('/', async (req, res) => {
  const postRepository = getRepository(Post);
  const post = new Post();
  const { userId, playlistId, content } = req.body as CreatePostDto;

  post.userId = userId;
  post.playlistId = playlistId;
  post.content = content;
  post.createdAt = new Date();

  const createdPost = await postRepository.create(post);
  res.status(201).json(createdPost);
});

export default router;
