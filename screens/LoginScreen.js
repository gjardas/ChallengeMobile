import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../services/AuthServices"; // Autenticação do Firebase
// import { setAuthToken } from "../services/ApiService"; // <-- REMOVIDO
import { useTheme } from "../contexts/themeContext";
import i18n, { changeLanguage, getCurrentLanguage } from "../services/i18n";

// const SUA_API_KEY = "xxxxx"; // <-- REMOVIDO

const createStyles = (theme) =>
  StyleSheet.create({
    languageButton: {
      position: "absolute",
      top: 20,
      right: 20,
      backgroundColor: theme.colors.surface,
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    languageButtonText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: "bold",
    },
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
      color: theme.colors.error,
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
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());
  const styles = createStyles(theme);

  const toggleLanguage = async () => {
    const newLanguage = currentLanguage === "pt" ? "es" : "pt";
    await changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    a;
  };

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("auth.emptyFields");
      return;
    }

    setIsLoading(true);

    try {
      // Passo 1: Autentica no Firebase (Entra no "prédio")
      await login(email, password);

      // setAuthToken(SUA_API_KEY); // <-- REMOVIDO

      // Passo 2: Agora navega para a tela principal
      navigation.navigate("Início");
    } catch (firebaseError) {
      let errorMessage = "auth.loginError";

      if (firebaseError.code === "auth/invalid-email") {
        errorMessage = "auth.invalidEmail";
      } else if (
        firebaseError.code === "auth/invalid-credential" ||
        firebaseError.code === "auth/wrong-password" ||
        firebaseError.code === "auth/user-not-found"
      ) {
        errorMessage = "auth.invalidCredentials";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
        <Text style={styles.languageButtonText}>
          {currentLanguage.toUpperCase()}
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>{i18n.t("common.appName")}</Text>

      {error ? <Text style={styles.errorText}>{i18n.t(error)}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder={i18n.t("auth.email")}
        placeholderTextColor={theme.colors.tertiary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder={i18n.t("auth.password")}
        placeholderTextColor={theme.colors.tertiary}
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
          <ActivityIndicator size="small" color={theme.colors.text} />
        ) : (
          <Text style={styles.buttonText}>{i18n.t("auth.login")}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("CadastroUsuario")}>
        <Text style={styles.linkText}>{i18n.t("auth.dontHaveAccount")}</Text>
      </TouchableOpacity>
    </View>
  );
}
