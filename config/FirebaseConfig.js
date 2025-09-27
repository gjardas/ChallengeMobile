import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; 
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; 

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});