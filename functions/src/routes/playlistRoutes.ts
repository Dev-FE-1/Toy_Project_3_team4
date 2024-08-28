// src/routes/playlistRoutes.ts
import * as express from 'express';
import { getRepository } from 'fireorm';

import { Playlist } from '../models/models';

const router = express.Router();

router.get('/', async (req, res) => {
  const playlistRepository = getRepository(Playlist);
  const playlists = await playlistRepository.find();
  res.json(playlists);
});

router.get('/:id', async (req, res) => {
  const playlistRepository = getRepository(Playlist);
  const playlist = await playlistRepository.findById(req.params.id);
  if (playlist) {
    res.json(playlist);
  } else {
    res.status(404).send('Playlist not found');
  }
});

router.post('/', async (req, res) => {
  const playlistRepository = getRepository(Playlist);
  const playlist = new Playlist();
  const { userId, title, description, isPublic, videos } = req.body;

  playlist.userId = userId;
  playlist.title = title;
  playlist.description = description;
  playlist.isPublic = isPublic;
  playlist.videos = videos;
  playlist.createdAt = new Date();

  const createdPlaylist = await playlistRepository.create(playlist);
  res.status(201).json(createdPlaylist);
});

router.put('/:id', async (req, res) => {
  const playlistRepository = getRepository(Playlist);
  const { title, description, isPublic } = req.body;
  const playlist = await playlistRepository.findById(req.params.id);

  if (playlist) {
    playlist.title = title || playlist.title;
    playlist.description = description || playlist.description;
    playlist.isPublic = isPublic !== undefined ? isPublic : playlist.isPublic;

    const updatedPlaylist = await playlistRepository.update(playlist);
    res.json(updatedPlaylist);
  } else {
    res.status(404).send('Playlist not found');
  }
});

router.delete('/:id', async (req, res) => {
  const playlistRepository = getRepository(Playlist);
  const playlist = await playlistRepository.findById(req.params.id);

  if (playlist) {
    await playlistRepository.delete(req.params.id);
    res.status(204).send();
  } else {
    res.status(404).send('Playlist not found');
  }
});

export default router;
