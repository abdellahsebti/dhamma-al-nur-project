import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Ensure the private key is properly formatted
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (!privateKey) {
  throw new Error('FIREBASE_PRIVATE_KEY is not set in environment variables');
}

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
  }),
};

// Initialize Firebase Admin only if it hasn't been initialized
const apps = getApps();
if (!apps.length) {
  initializeApp(firebaseAdminConfig);
}

export const auth = getAuth();
export const adminDb = getFirestore(); 