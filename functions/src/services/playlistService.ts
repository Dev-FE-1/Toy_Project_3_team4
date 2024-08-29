import { getRepository } from 'fireorm';

import { getFirestore } from '../firebase';
import { Playlist, User } from '../models/models';

class playlistUpdateDto {
  id!: string;
  userId!: string;
  title!: string;
  description!: string;
  isPublic!: boolean;
}

export class PlaylistService {
  private playlistRepository: ReturnType<typeof getRepository<Playlist>>;
  private userRepository: ReturnType<typeof getRepository<User>>;

  constructor() {
    getFirestore();
    this.playlistRepository = getRepository(Playlist);
    this.userRepository = getRepository(User);
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
    newPlaylist.description = description || '';
    newPlaylist.isPublic = isPublic || false;
    newPlaylist.createdAt = new Date();
    newPlaylist.videos = [];

    return await this.playlistRepository.create(newPlaylist);
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

  async getPlaylistById(playlistId: string): Promise<Playlist> {
    return await this.playlistRepository.findById(playlistId);
  }

  async getPlaylistsByUser(userId: string): Promise<Playlist[]> {
    return await this.playlistRepository.whereEqualTo('userId', userId).find();
  }

  async updatePlaylist(updatedPlaylistData: playlistUpdateDto): Promise<Playlist> {
    const playlist = await this.playlistRepository.findById(updatedPlaylistData.id);
    if (!playlist) {
      throw new Error('Playlist not found');
    }

    playlist.title = updatedPlaylistData.title;
    playlist.userId = updatedPlaylistData.userId;
    playlist.description = updatedPlaylistData.description;
    playlist.isPublic = updatedPlaylistData.isPublic;

    return await this.playlistRepository.update(playlist);
  }

  async deletePlaylist(userId: string, playlistId: string): Promise<void> {
    const playlist = await this.playlistRepository.findById(playlistId);
    if (!playlist) {
      throw new Error('Playlist not found');
    }

    if (playlist.userId !== userId) {
      throw new Error('Unauthorized');
    }
    await this.playlistRepository.delete(playlistId);
  }
}
