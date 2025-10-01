// services/VagaService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const VAGA_STORAGE_KEY = "@MottuVagas";

// Carrega o mapeamento completo: { "placaABC1234": 5, ... }
export const loadVagasMap = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(VAGA_STORAGE_KEY);
    // Retorna o objeto mapeado ou um objeto vazio se não houver nada
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    console.error("Erro ao carregar mapa de vagas:", e);
    return {};
  }
};

// Salva a nova vaga no mapa e atualiza o AsyncStorage
export const saveVaga = async (placa, numeroVaga) => {
  const vagasMap = await loadVagasMap();

  // Converte o número da vaga para string para armazenar
  vagasMap[placa] = String(numeroVaga);

  try {
    await AsyncStorage.setItem(VAGA_STORAGE_KEY, JSON.stringify(vagasMap));
  } catch (e) {
    console.error("Erro ao salvar vaga:", e);
  }
};

// Remove a vaga (usado na exclusão)
export const deleteVaga = async (placa) => {
  const vagasMap = await loadVagasMap();
  if (vagasMap[placa]) {
    delete vagasMap[placa];
    try {
      await AsyncStorage.setItem(VAGA_STORAGE_KEY, JSON.stringify(vagasMap));
    } catch (e) {
      console.error("Erro ao deletar vaga:", e);
    }
  }
};
