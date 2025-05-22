// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function salvarMotos(motos) {
  try {
    await AsyncStorage.setItem('motos', JSON.stringify(motos));
  } catch (e) {
    console.error('Erro ao salvar:', e);
  }
}

export async function carregarMotos() {
  try {
    const data = await AsyncStorage.getItem('motos');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Erro ao carregar:', e);
    return [];
  }
}

export async function excluirMoto(placa) {
  const motos = await carregarMotos();
  const novas = motos.filter(moto => moto.placa !== placa);
  await salvarMotos(novas);
  return novas;
}