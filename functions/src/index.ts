// import * as logger from "firebase-functions/logger";
import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import * as serviceAccount from '../lib/serviceAccountKey.json';

// Firebase Admin SDK init
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

// const db = admin.firestore();
const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
  return res.status(200).send('Hello World!');
});

export const api = functions.https.onRequest(app);
