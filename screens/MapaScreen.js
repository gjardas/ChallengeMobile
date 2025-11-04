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
import { loadVagasMap } from "../services/VagaService";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/themeContext";
import i18n from "../services/i18n";

const NUM_VAGAS = 20;

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.primary,
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
      backgroundColor: `${theme.colors.success}15`,
      borderColor: theme.colors.success,
    },
    vagaOcupada: {
      backgroundColor: `${theme.colors.error}15`,
      borderColor: theme.colors.error,
    },
    vagaNumero: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.text,
      marginLeft: 5,
    },
    vagaStatus: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.text,
      textAlign: "center",
    },
    vagaDetail: {
      fontSize: 12,
      color: theme.colors.text,
      opacity: 0.7,
      textAlign: "center",
      marginTop: 2,
    },
  });

export default function MapaScreen({ navigation }) {
  const { theme } = useTheme();
  const [vagas, setVagas] = useState(Array(NUM_VAGAS).fill(null));
  const [isLoading, setIsLoading] = useState(true);
  const styles = createStyles(theme);

  const carregarStatusVagas = async () => {
    setIsLoading(true);
    try {
      const motosAPI = await getMotos();

      const vagasMap = await loadVagasMap();

      const novoStatusVagas = Array(NUM_VAGAS).fill(null);

      motosAPI.forEach((moto) => {
        const placa = moto.placa;

        const vagaNumStr = vagasMap[placa];
        const numeroVaga = parseInt(vagaNumStr);

        if (!isNaN(numeroVaga) && numeroVaga > 0 && numeroVaga <= NUM_VAGAS) {
          novoStatusVagas[numeroVaga - 1] = { ...moto, vaga: numeroVaga };
        }
      });

      setVagas(novoStatusVagas);
    } catch (error) {
      console.error("Falha ao carregar vagas:", error);
      Alert.alert(
        i18n.t("common.apiError"),
        i18n.t("parking.errorLoadingParkingMap")
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
      const statusText = vagaOcupada ? moto.placa : i18n.t("parking.free");
      const statusDetail = vagaOcupada
        ? `${i18n.t("motorcycle.model")}: ${
            moto.modelo || i18n.t("common.notAvailable")
          }`
        : i18n.t("parking.parkHere");
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
              color={vagaOcupada ? theme.colors.error : theme.colors.success}
            />
            <Text style={styles.vagaNumero}>
              {i18n.t("parking.spot")} {numero}
            </Text>
          </View>
          <Text style={styles.vagaStatus}>{statusText}</Text>
          <Text style={styles.vagaDetail}>{statusDetail}</Text>
        </View>
      );
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <HeaderCustom
        navigation={navigation}
        title={i18n.t("parking.parkingMap")}
      />

      <View style={styles.container}>
        <Text style={styles.title}>
          {i18n.t("parking.parkingMap")} - {vagas.filter((v) => v).length}{" "}
          {i18n.t("parking.occupied")} {i18n.t("common.of")} {NUM_VAGAS}
        </Text>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={theme.colors.primary}
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
