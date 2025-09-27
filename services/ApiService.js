import axios from 'axios';

// Usando o endereço correto para o emulador Android
const API_URL = 'http://10.0.2.2:8080/motos'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMotos = async (page = 0, size = 10, sortBy = 'placa') => {
  try {
    // CORREÇÃO: Adiciona os parâmetros de paginação/filtro à URL
    const params = {
      page: page,
      size: size,
      sortBy: sortBy,
      // Você pode adicionar mais filtros aqui, se necessário (ex: placaFiltro)
    };
    
    const response = await api.get('/', { params });
    
    // CORREÇÃO: Acessa o array de motos dentro da propriedade 'content'
    return response.data.content; 
  } catch (error) {
    console.error('Erro ao buscar motos:', error.response?.data || error.message);
    throw error;
  }
};

export const createMoto = async (motoData) => {
  try {
    const response = await api.post('/', motoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar moto:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteMoto = async (placa) => { // Mudança para 'placa' (String) para coincidir com o CRUD
  try {
    await api.delete(`/${placa}`);
  } catch (error) {
    console.error('Erro ao deletar moto:', error.response?.data || error.message);
    throw error;
  }
};

export const updateMoto = async (placa, motoData) => { // Mudança para 'placa' (String) para coincidir com o CRUD
  try {
    const response = await api.put(`/${placa}`, motoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar moto:', error.response?.data || error.message);
    throw error;
  }
};