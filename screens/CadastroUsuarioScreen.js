import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { register } from "../services/AuthService";

export default function CadastroUsuarioScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password);

      Alert.alert(
        "Sucesso",
        "Usuário cadastrado com sucesso! Faça login para continuar.",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
    } catch (firebaseError) {
      let errorMessage = "Erro ao cadastrar. Tente novamente.";

      if (firebaseError.code === "auth/email-already-in-use") {
        errorMessage = "Este e-mail já está em uso.";
      } else if (firebaseError.code === "auth/invalid-email") {
        errorMessage = "O formato do e-mail é inválido.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

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
        placeholder="Senha (Mínimo 6 caracteres)"
        placeholderTextColor="#7f7f7f"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#7f7f7f"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#1e1e1e" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Já tem conta? Faça Login.</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
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
    marginTop: 15,
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
