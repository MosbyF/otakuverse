'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// This function initializes Firebase and returns the SDKs.
export function initializeFirebase() {
  // If no Firebase app has been initialized, create one.
  if (!getApps().length) {
    // initializeApp() is called with the config object.
    // In a Vercel environment, the environment variables from .env.local
    // will be used to populate the firebaseConfig object.
    initializeApp(firebaseConfig);
  }
  
  // Return the initialized app and SDKs.
  return getSdks(getApp());
}

// This helper function gets the SDK instances from the Firebase app.
export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

// Export all the necessary hooks and providers for use in your components.
export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './auth/use-user';
export * from './errors';
export * from './error-emitter';
