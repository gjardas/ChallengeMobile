// screens/CadastroScreen.js (CÓDIGO FINAL COM VAGA AUTOMÁTICA E VALIDAÇÕES)
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
import { createMoto, getMotos } from "../services/ApiService"; // getMotos necessário para a vaga automática
import { saveVaga } from "../services/VagaService"; // Importe o serviço local de vagas
import { useTheme } from "../contexts/themeContext";

const NUM_VAGAS = 20; // Defina o limite de vagas

// Função utilitária para validação de placa
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
      color: "red",
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

      // Criamos um mapa local das vagas ocupadas usando o campo 'vaga' retornado pela API
      const vagasOcupadas = new Set(
        motos.map((m) => parseInt(m.vaga)).filter((v) => !isNaN(v) && v > 0)
      );

      // Tentamos encontrar o primeiro número livre
      for (let i = 1; i <= NUM_VAGAS; i++) {
        if (!vagasOcupadas.has(i)) {
          return i;
        }
      }
      return null;
    } catch (error) {
      // Em caso de falha da API, retornamos null
      return null;
    }
  };

  const salvar = async () => {
    setErro("");

    // 1. VALIDAÇÕES COMPLETAS (Critério 1.c)
    if (!placa.trim()) {
      setErro("Informe a placa da moto.");
      return;
    }
    if (!placaValida(placa)) {
      setErro("Formato da placa inválido. Use ABC1234 ou ABC1D23.");
      return;
    }
    const anoNum = parseInt(ano);
    if (
      isNaN(anoNum) ||
      anoNum < 1900 ||
      anoNum > new Date().getFullYear() + 1
    ) {
      setErro("Ano inválido.");
      return;
    }

    setIsLoading(true);

    // 2. LÓGICA DE ALOCAÇÃO AUTOMÁTICA
    const vagaEncontrada = await encontrarProximaVagaLivre();

    if (vagaEncontrada === null) {
      setErro(`Todas as ${NUM_VAGAS} vagas estão ocupadas.`);
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
        // Enviamos a vaga, esperando que a API persista.
        vaga: vagaEncontrada,
      };

      // 3. ENVIA OS DADOS PARA A API
      await createMoto(novaMotoData);

      // 4. WORKAROUND: SALVA A VAGA NO STORAGE LOCAL PARA GARANTIR O MAPA
      await saveVaga(novaMotoData.placa, vagaEncontrada);

      // Limpa formulário após sucesso
      setPlaca("");
      setModelo("");
      setAno("");
      setStatus("");
      setObservacoes("");

      Alert.alert(
        "Sucesso",
        `Moto cadastrada automaticamente na vaga ${vagaEncontrada}!`
      );
      // Navega para a lista para ver a moto cadastrada
      navigation.navigate("Lista");
    } catch (error) {
      console.error("Falha ao salvar moto:", error);
      setErro(error.response?.data?.message || "Erro ao cadastrar a moto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <HeaderCustom navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastro de Moto</Text>

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
          onPress={salvar}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#1e1e1e" />
          ) : (
            <Text style={styles.buttonText}>Salvar</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
