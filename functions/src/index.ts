// import * as logger from "firebase-functions/logger";
import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';

import { initializeFirebase } from './firebase';
import postRoutes from './routes/postRoutes';

initializeFirebase();

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
  return res.status(200).send('Hello World!');
});

app.use('/v1/posts', postRoutes);

export const api = functions.https.onRequest(app);
