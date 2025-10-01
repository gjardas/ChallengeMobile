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

export default function EditarScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [status, setStatus] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");

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
      setErro("Informe a placa da moto");
      return;
    }
    setErro("");
    setIsLoading(true);
    // Aqui você pode chamar updateMoto e navegar de volta após salvar
    try {
      await updateMoto(motoId, { placa, modelo, ano, status, observacoes });
      Alert.alert("Sucesso", "Moto atualizada com sucesso!");
      navigation.goBack();
    } catch (error) {
      setErro("Erro ao atualizar moto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <HeaderCustom navigation={navigation} title="Editar Moto" />
      <View style={styles.container}>
        <Text style={styles.title}>Editar Moto</Text>
        <TextInput
          style={styles.input}
          placeholder="Placa"
          placeholderTextColor="#aaa"
          value={placa}
          onChangeText={setPlaca}
        />
        <TextInput
          style={styles.input}
          placeholder="Modelo"
          placeholderTextColor="#aaa"
          value={modelo}
          onChangeText={setModelo}
        />
        <TextInput
          style={styles.input}
          placeholder="Ano"
          placeholderTextColor="#aaa"
          value={ano}
          onChangeText={setAno}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Status"
          placeholderTextColor="#aaa"
          value={status}
          onChangeText={setStatus}
        />
        <TextInput
          style={styles.input}
          placeholder="Observações"
          placeholderTextColor="#aaa"
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
            <ActivityIndicator color="#1e1e1e" />
          ) : (
            <Text style={styles.buttonText}>Salvar</Text>
          )}
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
    color: "#00ff7f",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#00ff7f",
    backgroundColor: "#2a2a2a",
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  erroTexto: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#00ff7f",
    paddingVertical: 12,
    width: "80%",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 12,
    minHeight: 48,
  },
  buttonText: {
    color: "#1e1e1e",
    fontWeight: "bold",
    fontSize: 18,
  },
});
