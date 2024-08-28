import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

import * as serviceAccount from './serviceAccountKey.json';

export const initializeFirebase = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
    });

    const firestore = admin.firestore();
    fireorm.initialize(firestore);
  }

  return admin.firestore();
};
