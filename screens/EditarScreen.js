import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderCustom from "../components/HeaderCustom";
import { updateMoto } from "../services/ApiService";
import { useTheme } from "../contexts/themeContext";
import i18n from "../services/i18n";

const createStyles = (theme) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
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
    erroTexto: {
      color: theme.colors.error,
      marginBottom: 10,
      fontSize: 14,
      textAlign: "center",
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
  });

export default function EditarScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [status, setStatus] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");
  const styles = createStyles(theme);

  const motoId = route.params?.moto.id;

  useEffect(() => {
    if (route.params?.moto) {
      const { moto } = route.params;
      setPlaca(moto.placa);
      setModelo(moto.modelo || "");
      setAno(moto.ano ? String(moto.ano) : "");
      setStatus(moto.status || "");
      setObservacoes(moto.observacoes || "");
    }
  }, [route.params]);

  const salvarEdicao = async () => {
    if (!placa.trim()) {
      setErro(i18n.t("motorcycle.fillPlate"));
      return;
    }
    setErro("");
    setIsLoading(true);
    try {
      await updateMoto(motoId, { placa, modelo, ano, status, observacoes });
      Alert.alert(i18n.t("common.success"), i18n.t("motorcycle.updateSuccess"));
      navigation.goBack();
    } catch (error) {
      setErro(i18n.t("motorcycle.updateError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <HeaderCustom
        navigation={navigation}
        title={i18n.t("motorcycle.editMotorcycle")}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t("motorcycle.editMotorcycle")}</Text>
        <TextInput
          style={styles.input}
          placeholder={i18n.t("motorcycle.plate")}
          placeholderTextColor={theme.colors.tertiary}
          value={placa}
          onChangeText={setPlaca}
        />
        <TextInput
          style={styles.input}
          placeholder={i18n.t("motorcycle.model")}
          placeholderTextColor={theme.colors.tertiary}
          value={modelo}
          onChangeText={setModelo}
        />
        <TextInput
          style={styles.input}
          placeholder={i18n.t("motorcycle.year")}
          placeholderTextColor={theme.colors.tertiary}
          value={ano}
          onChangeText={setAno}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder={i18n.t("motorcycle.status")}
          placeholderTextColor={theme.colors.tertiary}
          value={status}
          onChangeText={setStatus}
        />
        <TextInput
          style={styles.input}
          placeholder={i18n.t("motorcycle.observations")}
          placeholderTextColor={theme.colors.tertiary}
          value={observacoes}
          onChangeText={setObservacoes}
        />
        {erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}
        <TouchableOpacity
          style={styles.button}
          onPress={salvarEdicao}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.colors.text} />
          ) : (
            <Text style={styles.buttonText}>{i18n.t("common.save")}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
