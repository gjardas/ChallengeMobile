import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderCustom from "../components/HeaderCustom";

const NUM_COLS = 4;
const NUM_VAGAS = 12;

export default function MapaScreen({ navigation }) {
  const [vagas, setVagas] = useState(Array(NUM_VAGAS).fill(false));

  useEffect(() => {
    const carregarMotos = async () => {
      try {
        const data = await AsyncStorage.getItem("motos");
        const motos = data ? JSON.parse(data) : [];

        const vagasOcupadas = Array(NUM_VAGAS).fill(false);

        motos.forEach((moto) => {
          const vagaNum = Number(moto.vaga);
          if (vagaNum >= 1 && vagaNum <= NUM_VAGAS) {
            vagasOcupadas[vagaNum - 1] = true;
          }
        });

        setVagas(vagasOcupadas);
      } catch (error) {
        console.error("Erro ao carregar motos:", error);
      }
    };

    carregarMotos();
  }, []);

  const larguraVaga =
    (Dimensions.get("window").width - 40 - (NUM_COLS - 1) * 10) / NUM_COLS;

  return (
    <View style={{ flex: 1, backgroundColor: "#1e1e1e" }}>
      <HeaderCustom navigation={navigation} title="Mapa" />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Mapa de Vagas (Atualizado)</Text>
        <Text style={styles.subtitle}>
          Vagas ocupadas de acordo com motos cadastradas
        </Text>

        <View style={styles.grid}>
          {vagas.map((ocupada, i) => (
            <View
              key={i}
              style={[
                styles.vaga,
                ocupada ? styles.ocupada : styles.livre,
                { width: larguraVaga, height: larguraVaga },
              ]}
            >
              <Text style={styles.vagaTexto}>Vaga {i + 1}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#00ff7f",
  },

  subtitle: {
    fontSize: 16,
    color: "#d0f0c0",
    marginBottom: 20,
    textAlign: "center",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  vaga: {
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  ocupada: {
    backgroundColor: "#00cc44",
  },

  livre: {
    backgroundColor: "#555555",
  },

  vagaTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});
