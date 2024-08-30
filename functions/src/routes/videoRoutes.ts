// src/routes/userRoutes.ts
import * as express from 'express';

import { VideoService } from '../services/videoService';

const router = express.Router();
const videoService = new VideoService();

export class CreateVideoDto {
  userId!: string;
  title!: string;
  videoUrl!: string;
  thumbnailUrl!: string;
}

router.post('/', async (req, res) => {
  try {
    const { userId, title, videoUrl, thumbnailUrl } = req.body as CreateVideoDto;
    const newVideo = await videoService.createVideo(
      userId,
      title,
      videoUrl,
      thumbnailUrl,
      'creater',
    );
    res.json(newVideo);
  } catch (error) {
    res.status(500).send('Error creating video');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const fetchedVideo = await videoService.getVideosByIds([req.params.id]);
    res.json(fetchedVideo);
  } catch (error) {
    res.status(500).send('Error fetching videos');
  }
});
