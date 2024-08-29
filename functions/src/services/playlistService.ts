import { getRepository } from 'fireorm';

import { getFirestore } from '../firebase';
import { Playlist } from '../models/models';

export class PlaylistService {
  private playlistRepository: ReturnType<typeof getRepository<Playlist>>;

  constructor() {
    getFirestore();
    this.playlistRepository = getRepository(Playlist);
  }

  async createPlaylist(
    userId: string,
    title: string,
    description: string,
    isPublic: boolean,
  ): Promise<Playlist> {
    const newPlaylist = new Playlist();
    newPlaylist.userId = userId;
    newPlaylist.title = title;
    newPlaylist.description = description;
    newPlaylist.isPublic = isPublic;
    newPlaylist.createdAt = new Date();
    newPlaylist.videos = [];

    return await this.playlistRepository.create(newPlaylist);
  }

  async getPlaylist(limit = 100, lastPostId?: string): Promise<Playlist[]> {
    let query = this.playlistRepository.orderByDescending('createdAt');

    if (lastPostId) {
      const lastPost = await this.playlistRepository.findById(lastPostId);
      if (lastPost) {
        query = query.whereGreaterThan('createdAt', lastPost.createdAt);
      } else {
        console.warn(`Last post with id ${lastPostId} not found.`);
      }
    }

    query = query.limit(limit);
    return await query.find();
  }

  async addVideoToPlaylist(playlistId: string, videoId: string): Promise<void> {
    const playlist = await this.playlistRepository.findById(playlistId);
    if (!playlist) {
      throw new Error('Playlist not found');
    }

    if (!playlist.videos) {
      playlist.videos = [];
    }

    playlist.videos.push(videoId);
    await this.playlistRepository.update(playlist);
  }

  async getPlaylistById(playlistId: string): Promise<Playlist> {
    return await this.playlistRepository.findById(playlistId);
  }

  async getPlaylistsByUser(userId: string): Promise<Playlist[]> {
    return await this.playlistRepository.whereEqualTo('userId', userId).find();
  }
}
