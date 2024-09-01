// import { getRepository } from 'fireorm';

// import { getFirestore } from '../firebase';
// import { playlists, users, videos } from '../models/models';

// class playlistUpdateDto {
//   id!: string;
//   userId!: string;
//   title!: string;
//   description!: string;
//   isPublic!: boolean;
// }

// export class PlaylistService {
//   private playlistRepository: ReturnType<typeof getRepository<playlists>>;
//   private userRepository: ReturnType<typeof getRepository<users>>;

//   constructor() {
//     getFirestore();
//     this.playlistRepository = getRepository(playlists);
//     this.userRepository = getRepository(users);
//   }

//   async createPlaylist(
//     userId: string,
//     title: string,
//     isPublic: boolean,
//     videos: string,
//   ): Promise<playlists> {
//     const newPlaylist = new playlists();
//     newPlaylist.userId = userId;
//     newPlaylist.title = title;
//     newPlaylist.isPublic = isPublic || false;
//     newPlaylist.createdAt = new Date();

//     return await this.playlistRepository.create(newPlaylist);
//   }

//   async getPlaylistById(playlistId: string): Promise<playlists> {
//     return await this.playlistRepository.findById(playlistId);
//   }

//   async getPlaylistsByUser(userId: string): Promise<playlists[]> {
//     return await this.playlistRepository.whereEqualTo('userId', userId).find();
//   }

//   async updatePlaylist(updatedPlaylistData: playlistUpdateDto): Promise<playlists> {
//     const playlist = await this.playlistRepository.findById(updatedPlaylistData.id);
//     if (!playlist) {
//       throw new Error('Playlist not found');
//     }

//     playlist.title = updatedPlaylistData.title;
//     playlist.userId = updatedPlaylistData.userId;
//     playlist.isPublic = updatedPlaylistData.isPublic;

//     return await this.playlistRepository.update(playlist);
//   }

//   async deletePlaylist(userId: string, playlistId: string): Promise<void> {
//     const playlist = await this.playlistRepository.findById(playlistId);
//     if (!playlist) {
//       throw new Error('Playlist not found');
//     }

//     if (playlist.userId !== userId) {
//       throw new Error('Unauthorized');
//     }
//     await this.playlistRepository.delete(playlistId);
//   }
// }
