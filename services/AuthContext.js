// services/AuthContext.js (AGORA COM FIREBASE)
import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../config/FirebaseConfig'; 
import { logout } from './AuthService'; 
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Escuta as mudanças do Firebase
    const subscriber = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return subscriber; 
  }, []);

  const authState = {
    isLoggedIn: !!user, 
    user,
    logout: async () => {
        setIsLoading(true);
        await logout(); 
    },
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff7f" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
});