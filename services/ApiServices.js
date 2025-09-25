import axios from 'axios';

const API_URL = 'http://localhost:8080/motos';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMotos = async () => {
  try {
    const response = await api.get('/');
    return response.data;
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

// Deletar moto por ID
export const deleteMoto = async (id) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error('Erro ao deletar moto:', error.response?.data || error.message);
    throw error;
  }
};

// Atualizar moto por ID
export const updateMoto = async (id, motoData) => {
  try {
    const response = await api.put(`/${id}`, motoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar moto:', error.response?.data || error.message);
    throw error;
  }
};
