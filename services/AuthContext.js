// services/AuthContext.js (AGORA COM FIREBASE)
import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../config/FirebaseConfig";
import { logout } from "./AuthService"; // Usa a função de logout do AuthService
import { ActivityIndicator, View, StyleSheet } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // O Firebase retorna um objeto de usuário, não apenas true/false
  const [isLoading, setIsLoading] = useState(true);

  // O melhor de usar o Firebase: a verificação em tempo real
  useEffect(() => {
    const subscriber = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      // Se houver um usuário logado (user é diferente de null), define-o.
      // Caso contrário, define como null.
      setUser(user);
      setIsLoading(false);
    });
    // Limpa a inscrição quando o componente é desmontado
    return subscriber;
  }, []);

  const authState = {
    // isLoggedIn agora é determinado pela presença do objeto user
    isLoggedIn: !!user,
    user,
    // As funções login/register não precisam ser definidas aqui, o
    // onAuthStateChanged faz o trabalho de atualizar o estado após o sucesso do serviço.
    logout: async () => {
      setIsLoading(true);
      await logout(); // Chama a função de logout do AuthService
    },
  };

  // Exibe o indicador de carregamento enquanto o Firebase verifica o estado
  if (isLoading) {
    return (
      <View style={styles.container}>
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
