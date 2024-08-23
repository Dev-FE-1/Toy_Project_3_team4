import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

// expmple of how to use this in a function
//
// import { db } from '../api/firebaseApp';
// import { getDoc, doc } from 'firebase/firestore';
// export const helloWorld = onRequest(async (request, response) => {
//   const docRef = doc(db, 'users', 'alovelace');
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     response.send(`Document data: ${JSON.stringify(docSnap.data())}`);
//   } else {
//     response.send('No such document!');
//  }
