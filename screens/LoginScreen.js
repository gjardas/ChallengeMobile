// screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../services/AuthService"; // Função de login do Firebase

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    try {
      // Chama o serviço de login. O AuthContext cuida de atualizar o estado global
      await login(email, password);
      // Se for sucesso, o AuthContext redireciona o usuário para o App Stack
    } catch (firebaseError) {
      let errorMessage = "Falha no login. Verifique suas credenciais.";

      if (firebaseError.code === "auth/invalid-email") {
        errorMessage = "O formato do e-mail é inválido.";
      } else if (
        firebaseError.code === "auth/invalid-credential" ||
        firebaseError.code === "auth/wrong-password" ||
        firebaseError.code === "auth/user-not-found"
      ) {
        errorMessage = "E-mail ou senha incorretos.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acesso MOTTU</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#7f7f7f"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#7f7f7f"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#1e1e1e" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("CadastroUsuario")}>
        <Text style={styles.linkText}>Não tem conta? Cadastre-se.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#00ff7f",
  },
  input: {
    width: "80%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#00ff7f",
    backgroundColor: "#2a2a2a",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#00ff7f",
    paddingVertical: 15,
    width: "80%",
    maxWidth: 400,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "#1e1e1e",
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: "#ff4d4d",
    marginBottom: 15,
    fontSize: 14,
    textAlign: "center",
  },
  linkText: {
    color: "#00ff7f",
    marginTop: 10,
    fontSize: 16,
  },
});
