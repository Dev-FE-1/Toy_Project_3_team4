import * as express from 'express';

import { PlaylistService } from '../services/playlistService';

const router = express.Router();
const playlistService = new PlaylistService();

router.post('/', async (req, res) => {
  try {
    const { userId, title, description, isPublic } = req.body;

    const playlist = await playlistService.createPlaylist(userId, title, description, isPublic);
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Error creating playlist' });
  }
});

router.get('/', async (req, res) => {
  try {
    const playlists = await playlistService.getPlaylist();
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user playlists' });
  }
});

router.get('/:id', async (req, res) => {
  const playlistId = req.params.id;
  console.log(playlistId);
  try {
    const playlists = await playlistService.getPlaylistById(playlistId);
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user playlists' });
  }
});

router.get('/user/:id', async (req, res) => {
  const playlistId = req.params.id;
  console.log(playlistId);
  try {
    const playlists = await playlistService.getPlaylistsByUser(playlistId);
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user playlists' });
  }
});

router.put('/:id', async (req, res) => {
  const { title, description, isPublic } = req.body;
  const playlistId = req.params.id;
  const userId = req.body.userId;
  try {
    const playlist = await playlistService.updatePlaylist({
      id: playlistId,
      userId,
      title,
      description,
      isPublic,
    });
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Error updating playlist' });
  }
});

router.delete('/:id', async (req, res) => {
  const playlistId = req.params.id;
  const userId = req.body.userId;
  try {
    await playlistService.deletePlaylist(userId, playlistId);
    res.status(200).json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting playlist' });
  }
});

// router.post('/:playlistId/videos', async (req, res) => {
//   try {
//     const { playlistId } = req.params;
//     const { videoId } = req.body;

//     await playlistService.addVideoToPlaylist(playlistId, videoId);
//     res.status(200).json({ message: 'Video added to playlist successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding video to playlist' });
//   }
// });

export default router;
