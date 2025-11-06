import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderCustom from "../components/HeaderCustom";
import { createMoto, getMotos } from "../services/ApiService";
import { saveVaga } from "../services/VagaService";
import { useTheme } from "../contexts/themeContext";
import i18n from "../services/i18n";
// 1. Importar notificação
import { sendLocalNotification } from "../services/NotificationService";

const NUM_VAGAS = 20;

const placaValida = (placa) => {
  const antiga = /^[A-Z]{3}[0-9]{4}$/i;
  const mercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/i;
  return antiga.test(placa) || mercosul.test(placa);
};

const createStyles = (theme) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flexGrow: 1,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 30,
      color: theme.colors.primary,
    },
    input: {
      width: "70%",
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.surface,
      padding: 12,
      marginBottom: 10,
      borderRadius: 8,
      color: theme.colors.text,
      textAlign: "center",
      fontSize: 16,
    },
    erroTexto: {
      color: theme.colors.error,
      marginBottom: 10,
      fontSize: 14,
      textAlign: "center",
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      width: "70%",
      borderRadius: 8,
      alignItems: "center",
      marginTop: 15,
    },
    buttonText: {
      color: theme.colors.background,
      fontWeight: "bold",
      fontSize: 18,
    },
    infoText: {
      color: theme.colors.primary,
      fontSize: 14,
      marginBottom: 10,
      textAlign: "center",
    },
  });

export default function CadastroScreen({ navigation }) {
  const { theme } = useTheme();
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [status, setStatus] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");
  const styles = createStyles(theme);

  const encontrarProximaVagaLivre = async () => {
    try {
      const motos = await getMotos();

      const vagasOcupadas = new Set(
        motos.map((m) => parseInt(m.vaga)).filter((v) => !isNaN(v) && v > 0)
      );

      for (let i = 1; i <= NUM_VAGAS; i++) {
        if (!vagasOcupadas.has(i)) {
          return i;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const salvar = async () => {
    setErro("");

    if (!placa.trim()) {
      setErro(i18n.t("motorcycle.fillPlate"));
      return;
    }
    if (!placaValida(placa)) {
      setErro(i18n.t("motorcycle.invalidPlate"));
      return;
    }
    const anoNum = parseInt(ano);
    if (
      isNaN(anoNum) ||
      anoNum < 1900 ||
      anoNum > new Date().getFullYear() + 1
    ) {
      setErro(i18n.t("motorcycle.invalidYear"));
      return;
    }

    setIsLoading(true);

    const vagaEncontrada = await encontrarProximaVagaLivre();

    if (vagaEncontrada === null) {
      setErro(i18n.t("parking.allSpotsOccupied", { total: NUM_VAGAS }));
      setIsLoading(false);
      return;
    }

    try {
      const novaMotoData = {
        placa: placa.toUpperCase(),
        modelo: modelo.trim(),
        ano: anoNum,
        status: status.trim() || "ATIVO",
        observacoes: observacoes.trim(),
        vaga: vagaEncontrada,
      };

      await createMoto(novaMotoData);

      await saveVaga(novaMotoData.placa, vagaEncontrada);

      // --- 2. ENVIAR NOTIFICAÇÃO DE SUCESSO ---
      sendLocalNotification(
        i18n.t("notification.motoCreatedTitle"),
        i18n.t("notification.motoCreatedBody", { placa: novaMotoData.placa })
      );
      // ------------------------------------

      setPlaca("");
      setModelo("");
      setAno("");
      setStatus("");
      setObservacoes("");

      Alert.alert(i18n.t("common.success"), i18n.t("motorcycle.saveSuccess"));
      navigation.navigate("Lista");
    } catch (error) {
      console.error("Falha ao salvar moto:", error);
      setErro(error.response?.data?.message || i18n.t("motorcycle.saveError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <HeaderCustom navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {i18n.t("motorcycle.registerMotorcycle")}
        </Text>

        <TextInput
          placeholder={i18n.t("motorcycle.plate")}
          style={styles.input}
          value={placa}
          onChangeText={(text) => setPlaca(text.toUpperCase())}
          placeholderTextColor={theme.colors.tertiary}
          autoCapitalize="characters"
          maxLength={7}
        />
        <TextInput
          placeholder={i18n.t("motorcycle.model")}
          style={styles.input}
          value={modelo}
          onChangeText={setModelo}
          placeholderTextColor={theme.colors.tertiary}
        />
        <TextInput
          placeholder={i18n.t("motorcycle.year")}
          style={styles.input}
          value={ano}
          onChangeText={setAno}
          placeholderTextColor={theme.colors.tertiary}
          keyboardType="numeric"
        />
        <TextInput
          placeholder={i18n.t("motorcycle.status")}
          style={styles.input}
          value={status}
          onChangeText={setStatus}
          placeholderTextColor={theme.colors.tertiary}
        />
        <TextInput
          placeholder={i18n.t("motorcycle.observations")}
          style={styles.input}
          value={observacoes}
          onChangeText={setObservacoes}
          placeholderTextColor={theme.colors.tertiary}
        />

        {erro !== "" && <Text style={styles.erroTexto}>{erro}</Text>}
        <TouchableOpacity
          style={styles.button}
          onPress={salvar}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={theme.colors.text} />
          ) : (
            <Text style={styles.buttonText}>{i18n.t("common.save")}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
