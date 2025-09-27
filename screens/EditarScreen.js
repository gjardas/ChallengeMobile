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
  const [vaga, setVaga] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");

  const originalPlaca = route.params?.moto.placa;

  useEffect(() => {
    if (route.params?.moto) {
      const { moto } = route.params;
      setPlaca(moto.placa);
      setVaga(moto.vaga);
    }
  }, [route.params]);

  const salvarEdicao = async () => {
    if (!placa.trim() || !vaga.trim()) {
      setErro("Placa e Vaga são obrigatórios.");
      return;
    }

    setIsLoading(true);
    try {
      const motoAtualizada = { placa: placa.toUpperCase(), vaga };
      await updateMoto(originalPlaca, motoAtualizada);
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
            <HeaderCustom title="Editar Moto" />     {" "}
      <View style={styles.container}>
                <Text style={styles.title}>Editar Moto</Text>
               {" "}
        <TextInput
          placeholder="Placa"
          style={styles.input}
          value={placa}
          onChangeText={(text) => setPlaca(text.toUpperCase())}
          placeholderTextColor="#7f7f7f"
          autoCapitalize="characters"
          maxLength={7}
        />
               {" "}
        <TextInput
          placeholder="Vaga"
          style={styles.input}
          value={vaga}
          onChangeText={setVaga}
          placeholderTextColor="#7f7f7f"
          keyboardType="numeric"
        />
                {erro !== "" && <Text style={styles.erroTexto}>{erro}</Text>}   
           {" "}
        <TouchableOpacity
          style={styles.button}
          onPress={salvarEdicao}
          disabled={isLoading}
        >
                   {" "}
          {isLoading ? (
            <ActivityIndicator size="small" color="#1e1e1e" />
          ) : (
            <Text style={styles.buttonText}>Salvar Edição</Text>
          )}
                 {" "}
        </TouchableOpacity>
             {" "}
      </View>
         {" "}
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
