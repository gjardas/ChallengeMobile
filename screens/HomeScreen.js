import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import HeaderCustom from "../components/HeaderCustom";
import { useTheme } from "../contexts/themeContext";

const createStyles = (theme) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.primary,
      marginTop: 40,
      marginBottom: 10,
      textAlign: "center",
    },
    container: {
      flexGrow: 1,
      paddingVertical: 20,
      paddingHorizontal: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      width: "80%",
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 12,
      minHeight: 48,
    },
    buttonText: {
      color: theme.colors.background,
      fontWeight: "bold",
      fontSize: 18,
    },
  });

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.screenContainer}>
      <HeaderCustom navigation={{ ...navigation, showBack: false }} />

      <Text style={styles.title}>Gestão de Vagas e Motos - Mottu</Text>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.buttonText}>Cadastrar Moto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Lista")}
        >
          <Text style={styles.buttonText}>Lista de Motos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Mapa")}
        >
          <Text style={styles.buttonText}>Mapa de Vagas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Sobre")}
        >
          <Text style={styles.buttonText}>Sobre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
