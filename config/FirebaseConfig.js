import { initializeApp } from "firebase/app";
// 1. Importações atualizadas para persistência de login
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
// 2. Importação do AsyncStorage
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAFgKdErjZgqNuCCZDndQNMH541X7Z6pzE",
  authDomain: "mottu-e25a9.firebaseapp.com",
  databaseURL: "https://mottu-e25a9-default-rtdb.firebaseio.com",
  projectId: "mottu-e25a9",
  storageBucket: "mottu-e25a9.firebasestorage.app",
  messagingSenderId: "913138282684",
  appId: "1:913138282684:web:966c4361d31bb5b161e0b9",
  measurementId: "G-NE3FPLLCFZ",
};

const app = initializeApp(firebaseConfig);

// 3. Inicializa o Auth com persistência (AsyncStorage)
// Isso corrige o aviso do console e faz o login persistir
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// 4. Exporta a instância de auth inicializada
export const FIREBASE_AUTH = auth;
