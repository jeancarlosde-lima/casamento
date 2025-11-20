// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "studio-4205786983-1fb47",
  "appId": "1:202079827350:web:cc56552eb0628332f399b7",
  "apiKey": "AIzaSyD_mr1fqzqZarNyuaHZrdSRPJVdMYt5KCo",
  "authDomain": "studio-4205786983-1fb47.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "202079827350"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
