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
    try {
      const motoAtualizada = {
        placa: placa.toUpperCase(),
        modelo,
        ano,
        status,
        observacoes,
      };
      await updateMoto(motoId, motoAtualizada);
      Alert.alert("Sucesso", "Moto atualizada com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Falha ao atualizar moto:", error);
      setErro(error.response?.data?.message || "Erro ao atualizar a moto.");
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
          placeholder="Placa"
          style={styles.input}
          value={placa}
          onChangeText={(text) => setPlaca(text.toUpperCase())}
          placeholderTextColor="#7f7f7f"
          autoCapitalize="characters"
          maxLength={7}
        />
        <TextInput
          placeholder="Modelo"
          style={styles.input}
          value={modelo}
          onChangeText={setModelo}
          placeholderTextColor="#7f7f7f"
        />
        <TextInput
          placeholder="Ano"
          style={styles.input}
          value={ano}
          onChangeText={setAno}
          placeholderTextColor="#7f7f7f"
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Status"
          style={styles.input}
          value={status}
          onChangeText={setStatus}
          placeholderTextColor="#7f7f7f"
        />
        <TextInput
          placeholder="Observações"
          style={styles.input}
          value={observacoes}
          onChangeText={setObservacoes}
          placeholderTextColor="#7f7f7f"
        />
        {erro !== "" && <Text style={styles.erroTexto}>{erro}</Text>}
        <TouchableOpacity
          style={styles.button}
          onPress={salvarEdicao}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#1e1e1e" />
          ) : (
            <Text style={styles.buttonText}>Salvar Edição</Text>
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
    width: "40%",
    borderWidth: 1,
    borderColor: "#00ff7f",
    backgroundColor: "#2a2a2a",
    padding: 12,
    marginBottom: 6,
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
    width: "40%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#1e1e1e",
    fontWeight: "bold",
    fontSize: 18,
  },
});
