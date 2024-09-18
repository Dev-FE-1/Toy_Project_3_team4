import playwrightFirebasePlugin from '@nearform/playwright-firebase';
import { test as base } from '@playwright/test';
import * as dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

dotenv.config();

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT!);
const UID = process.env.REACT_APP_UID!;
const options = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!);

const firebaseTest = playwrightFirebasePlugin(serviceAccount, options, UID, base);

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const test = firebaseTest;
