// services/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../config/FirebaseConfig";
import { logout } from "./AuthServices.js";
import { setAuthToken } from "./ApiService"; // Importa a função do ApiService
import { ActivityIndicator, View, StyleSheet } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscriber = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        // Se o usuário está logado, obtemos o token
        const token = await user.getIdToken();
        // E passamos para o ApiService para autenticar as chamadas
        setAuthToken(token);
      } else {
        // Se o usuário deslogou, limpamos o token do ApiService
        setAuthToken(null);
      }
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
      await logout(); // O onAuthStateChanged vai capturar a mudança e atualizar o estado
    },
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        {/* Indicador de carregamento enquanto verifica o estado de auth (Critério 2) */}
        <ActivityIndicator size="large" color="#00ff7f" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
  },
});
