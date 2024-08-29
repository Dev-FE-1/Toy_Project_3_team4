import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

import * as serviceAccount from './serviceAccountKey.json';

let firestore: admin.firestore.Firestore;

export const initializeFirebase = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
    });

    firestore = admin.firestore();
    fireorm.initialize(firestore);
  }

  return firestore;
};

export const getFirestore = () => {
  if (firestore === undefined || firestore === null) {
    initializeFirebase();
  }
  return firestore;
};
