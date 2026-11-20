import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyDA0mG96ZhRkIOR30MFy-G2zlwX2eiS2Z4",
  authDomain: "mural-da-turma-d9f98.firebaseapp.com",
  databaseURL: "https://mural-da-turma-d9f98-default-rtdb.firebaseio.com",
  projectId: "mural-da-turma-d9f98",
  storageBucket: "mural-da-turma-d9f98.firebasestorage.app",
  messagingSenderId: "630150664447",
  appId: "1:630150664447:web:3adf952b717ce366577cca"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth =
  Platform.OS === 'web'
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });

export const db = getFirestore(app);
export const rtdb = getDatabase(app);