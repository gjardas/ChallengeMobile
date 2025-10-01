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
import { login } from "../services/AuthServices";
import { useTheme } from "../contexts/themeContext";

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 40,
      color: theme.colors.primary,
    },
    input: {
      width: "80%",
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.surface,
      padding: 12,
      marginVertical: 10,
      borderRadius: 8,
      color: theme.colors.text,
      textAlign: "center",
      fontSize: 16,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      width: "80%",
      borderRadius: 8,
      alignItems: "center",
      marginVertical: 12,
      minHeight: 48,
    },
    buttonText: {
      color: theme.colors.background,
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
      color: theme.colors.primary,
      marginTop: 10,
      fontSize: 16,
    },
  });

export default function LoginScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const styles = createStyles(theme);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      navigation.navigate("Início");
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
      {/* <HeaderCustom navigation={{...navigation, showBack: false}} /> */}
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
