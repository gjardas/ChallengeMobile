import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import HeaderCustom from "../components/HeaderCustom";

export default function HomeScreen({ navigation }) {
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

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#1e1e1e",
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
    color: "#00ff7f",
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
    backgroundColor: "#00ff7f",
    paddingVertical: 12,
    width: "80%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    minHeight: 48,
  },
  buttonText: {
    color: "#1e1e1e",
    fontWeight: "bold",
    fontSize: 18,
  },
});
