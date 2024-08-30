import * as express from 'express';

import { PostService } from '../services/postService';

const router = express.Router();

const postService = new PostService();

router.get('/', async (req, res) => {
  try {
    const { userId, limit = 10, lastPostId } = req.query;
    console.log('lastPostId', lastPostId);
    if (!userId) {
      res.status(400).send('userId required to fetch posts');
      return;
    }
    const posts = await postService.getTimelinePosts(
      userId as string,
      Number(limit),
      lastPostId as string,
    );
    res.json(posts);
  } catch (error) {
    res.status(500).send('Error fetching posts');
  }
});

export default router;
