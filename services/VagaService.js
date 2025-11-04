import AsyncStorage from "@react-native-async-storage/async-storage";

const VAGA_STORAGE_KEY = "@MottuVagas";

export const loadVagasMap = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(VAGA_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    console.error("Erro ao carregar mapa de vagas:", e);
    return {};
  }
};

export const saveVaga = async (placa, numeroVaga) => {
  const vagasMap = await loadVagasMap();

  vagasMap[placa] = String(numeroVaga);

  try {
    await AsyncStorage.setItem(VAGA_STORAGE_KEY, JSON.stringify(vagasMap));
  } catch (e) {
    console.error("Erro ao salvar vaga:", e);
  }
};

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
