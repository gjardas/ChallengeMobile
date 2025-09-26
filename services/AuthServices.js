// services/AuthService.js (AGORA COM FIREBASE)
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../config/FirebaseConfig";

// Funções que o front-end chamará
export const login = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    return response.user;
  } catch (error) {
    // Lançamos o erro para ser tratado na tela de login
    throw error;
  }
};

export const register = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    return response.user;
  } catch (error) {
    // Lançamos o erro para ser tratado na tela de cadastro
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(FIREBASE_AUTH);
    // O AuthContext irá capturar essa mudança de estado
  } catch (error) {
    throw error;
  }
};
