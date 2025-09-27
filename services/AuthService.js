// services/AuthService.js (AGORA COM FIREBASE)
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
} from 'firebase/auth';
import { FIREBASE_AUTH } from '../config/FirebaseConfig'; 

export const login = async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(
            FIREBASE_AUTH,
            email,
            password
        );
        return response.user;
    } catch (error) {
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
        throw error;
    }
};

export const logout = async () => {
    try {
        await signOut(FIREBASE_AUTH);
    } catch (error) {
        throw error;
    }
};