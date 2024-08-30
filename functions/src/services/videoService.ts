import { getRepository } from 'fireorm';

import { getFirestore } from '../firebase';
import { videos } from '../models/models';

export class VideoService {
  private videoRepository: ReturnType<typeof getRepository<videos>>;

  constructor() {
    getFirestore();
    this.videoRepository = getRepository(videos);
  }

  async createVideo(
    userId: string,
    title: string,
    videoUrl: string,
    thumbnailUrl: string,
    creater: string,
  ): Promise<videos> {
    const newVideo = new videos();
    newVideo.userId = userId;
    newVideo.title = title;
    newVideo.videoUrl = videoUrl;
    newVideo.thumbnailUrl = thumbnailUrl;
    newVideo.uploadDate = new Date();
    newVideo.views = 0;
    newVideo.creater = creater;

    return await this.videoRepository.create(newVideo);
  }

  async incrementViews(videoId: string): Promise<void> {
    const video = await this.videoRepository.findById(videoId);
    if (!video) {
      throw new Error('Video not found');
    }

    video.views += 1;
    await this.videoRepository.update(video);
  }

  async getVideosByIds(videoIds: string[]): Promise<videos[]> {
    return await this.videoRepository.whereIn('id', videoIds).find();
  }
}
