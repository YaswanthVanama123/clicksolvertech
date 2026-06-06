import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAnalytics, isSupported as isAnalyticsSupported, type Analytics } from 'firebase/analytics';

// Vite injects VITE_-prefixed env vars at build time.
// Put real values in `.env.local` (which is gitignored).
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let app: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let analyticsInstance: Analytics | null = null;
let analyticsReady: Promise<Analytics | null> | null = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  dbInstance = getFirestore(app);

  // Analytics requires a browser env (window, cookies, etc.) and a measurementId.
  if (firebaseConfig.measurementId && typeof window !== 'undefined') {
    analyticsReady = isAnalyticsSupported().then((ok) => {
      if (ok && app) {
        analyticsInstance = getAnalytics(app);
        return analyticsInstance;
      }
      return null;
    });
  }
} else if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    '[firebase] Skipping init — no VITE_FIREBASE_API_KEY / PROJECT_ID found. ' +
      'Copy .env.example to .env.local and fill it in.',
  );
}

export const firebaseApp = app;
export const db = dbInstance;
export const getAnalyticsClient = () => analyticsReady ?? Promise.resolve(null);
