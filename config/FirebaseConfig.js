// config/FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// SUBSTITUA PELAS SUAS CHAVES DE CONFIGURAÇÃO DO FIREBASE
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

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o serviço de autenticação para uso
export const FIREBASE_AUTH = getAuth(app);
