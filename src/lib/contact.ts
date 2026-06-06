import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

export type ContactSubmission = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

export async function submitContactMessage(payload: ContactSubmission) {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      'Firebase is not configured. Set VITE_FIREBASE_* env vars in .env.local before submitting.',
    );
  }

  const ref = await addDoc(collection(db, 'contact_submissions'), {
    ...payload,
    createdAt: serverTimestamp(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
  });

  return ref.id;
}
