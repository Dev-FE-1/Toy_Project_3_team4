// src/routes/postRoutes.ts
import * as express from 'express';
import { getRepository } from 'fireorm';

import { Post } from '../models/post';

const router = express.Router();

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
  post.title = req.body.title || 'Untitled';
  post.content = req.body.content || '';
  post.createdAt = new Date();
  const createdPost = await postRepository.create(post);
  res.status(201).json(createdPost);
});

export default router;
