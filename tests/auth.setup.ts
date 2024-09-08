import playwrightFirebasePlugin from '@nearform/playwright-firebase';
import { test as base } from '@playwright/test';

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT!);
const UID = process.env.REACT_APP_UID!;
const options = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!);

const firebaseTest = playwrightFirebasePlugin(serviceAccount, options, UID, base);

export const test = firebaseTest;
