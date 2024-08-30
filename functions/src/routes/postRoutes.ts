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
    const posts = await postService.getPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching posts');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await postService.getPostsByIds([req.params.id]);
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(400).send('Post not found');
  }
});

// 포스트 수정 기능
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await postService.updatePost(req.body);
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating post');
  }
});

// 포스트 삭제 기능
router.delete('/:id', async (req, res) => {
  try {
    await postService.deletePost(req.params.id, req.body.userId);
    res.send('Post deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting post');
  }
});

// 포스트 좋아요 기능
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
