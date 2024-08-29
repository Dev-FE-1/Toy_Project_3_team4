import { getRepository } from 'fireorm';

import { Playlist } from '../models/models';
export class PlaylistService {
  private playlistRepository = getRepository(Playlist);

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

  async getPlaylistsByUser(userId: string): Promise<Playlist[]> {
    return await this.playlistRepository.whereEqualTo('userId', userId).find();
  }
}
