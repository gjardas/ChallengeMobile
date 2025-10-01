// screens/MapaScreen.js (CÓDIGO FINAL COM WORKAROUND DA API)
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import HeaderCustom from "../components/HeaderCustom";
import { getMotos } from "../services/ApiService";
import { loadVagasMap } from "../services/VagaService"; // <<< Importe o serviço local de vagas
import { Ionicons } from "@expo/vector-icons";

const NUM_VAGAS = 20;

export default function MapaScreen({ navigation }) {
  const [vagas, setVagas] = useState(Array(NUM_VAGAS).fill(null));
  const [isLoading, setIsLoading] = useState(true);

  const carregarStatusVagas = async () => {
    setIsLoading(true);
    try {
      // 1. Pega todas as motos da API
      const motosAPI = await getMotos();

      // 2. Pega o mapeamento Placa -> Vaga do Storage Local (WORKAROUND)
      const vagasMap = await loadVagasMap();

      const novoStatusVagas = Array(NUM_VAGAS).fill(null);

      // 3. Combina os dados: Mapeia as motos da API para as vagas do Storage Local
      motosAPI.forEach((moto) => {
        const placa = moto.placa;

        // Busca o número da vaga no mapa local, usando a Placa como chave
        const vagaNumStr = vagasMap[placa];
        const numeroVaga = parseInt(vagaNumStr);

        if (!isNaN(numeroVaga) && numeroVaga > 0 && numeroVaga <= NUM_VAGAS) {
          // Marca a vaga com o objeto moto (e o número da vaga)
          novoStatusVagas[numeroVaga - 1] = { ...moto, vaga: numeroVaga };
        }
      });

      setVagas(novoStatusVagas);
    } catch (error) {
      console.error("Falha ao carregar vagas:", error);
      Alert.alert(
        "Erro de API",
        "Não foi possível carregar o mapa de vagas. Verifique o login ou a conexão."
      );
      setVagas(Array(NUM_VAGAS).fill(null));
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarStatusVagas();
      return () => {};
    }, [])
  );

  const renderVagas = () => {
    return vagas.map((moto, index) => {
      const vagaOcupada = !!moto;
      const numero = index + 1;
      const statusText = vagaOcupada ? moto.placa : "LIVRE";
      const statusDetail = vagaOcupada
        ? `Modelo: ${moto.modelo || "N/A"}`
        : "Estacionar aqui";
      const style = vagaOcupada ? styles.vagaOcupada : styles.vagaLivre;
      const icon = vagaOcupada
        ? "close-circle-outline"
        : "checkmark-circle-outline";

      return (
        <View key={index} style={[styles.vaga, style]}>
          <View style={styles.vagaHeader}>
            <Ionicons
              name={icon}
              size={24}
              color={vagaOcupada ? "#fff" : "#1e1e1e"}
            />
            <Text style={styles.vagaNumero}>VAGA {numero}</Text>
          </View>
          <Text style={styles.vagaStatus}>{statusText}</Text>
          <Text style={styles.vagaDetail}>{statusDetail}</Text>
        </View>
      );
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1e1e1e" }}>
      <HeaderCustom navigation={navigation} title="Mapa de Vagas" />

      <View style={styles.container}>
        <Text style={styles.title}>
          Mapa de Vagas - {vagas.filter((v) => v).length} Ocupadas de{" "}
          {NUM_VAGAS}
        </Text>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#00ff7f"
            style={styles.loadingIndicator}
          />
        ) : (
          <ScrollView contentContainerStyle={styles.mapaContainer}>
            {renderVagas()}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00ff7f",
    marginVertical: 15,
  },
  loadingIndicator: {
    marginTop: 50,
  },
  mapaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  vaga: {
    width: "48%",
    marginVertical: 5,
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
  },
  vagaHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  vagaLivre: {
    backgroundColor: "#00ff7f15",
    borderColor: "#00ff7f",
  },
  vagaOcupada: {
    backgroundColor: "#ff4d4d15",
    borderColor: "#ff4d4d",
  },
  vagaNumero: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 5,
  },
  vagaStatus: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  vagaDetail: {
    fontSize: 12,
    color: "#ccc",
    textAlign: "center",
    marginTop: 2,
  },
});
