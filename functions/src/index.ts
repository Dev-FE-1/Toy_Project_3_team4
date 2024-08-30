import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';

import { initializeFirebase } from './firebase';
import commentRoutes from './routes/commentRoutes';
import playlistRoutes from './routes/playlistRoutes';
import postRoutes from './routes/postRoutes';
import timelineRoutes from './routes/timelineRoutes';
import userRoutes from './routes/userRoutes';

initializeFirebase();

const app = express();

const version = 'v1';

app.use(express.json());
app.use(cors({ origin: true }));

app.get('/', (_req, res) => {
  return res.status(200).send('Hello World!');
});

app.use(`/${version}/posts`, postRoutes);
app.use(`/${version}/playlists`, playlistRoutes);
app.use(`/${version}/users`, userRoutes);
app.use(`/${version}/timeline`, timelineRoutes);
app.use(`/${version}/comments`, commentRoutes);

export const api = functions.https.onRequest(app);
