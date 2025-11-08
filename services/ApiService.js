import axios from "axios";

// Verifique se este IP ainda é o correto para a sua máquina
const API_URL = "http://192.168.1.128:8080/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- ESTA É A FUNÇÃO CORRIGIDA ---
export const setAuthToken = (token) => {
  if (token) {
    // 1. Removemos o header "Authorization"
    delete api.defaults.headers.common["Authorization"];

    // 2. Adicionamos o header "X-API-KEY"
    api.defaults.headers.common["X-API-KEY"] = token; // <-- SEM o "Bearer "
    console.log("Token X-API-KEY set for API calls.");
  } else {
    delete api.defaults.headers.common["X-API-KEY"];
    console.log("Token X-API-KEY removed for API calls.");
  }
};
// --- FIM DA CORREÇÃO ---

export const getMotos = async () => {
  try {
    const response = await api.get("/api/motos"); // Adicionado /api
    return response.data.content;
  } catch (error) {
    console.error(
      "Erro ao buscar motos:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createMoto = async (motoData) => {
  try {
    const response = await api.post("/api/motos", motoData); // Adicionado /api
    return response.data;
  } catch (error) {
    console.error("Erro ao criar moto:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteMoto = async (id) => {
  try {
    console.log("Deleting moto with ID:", id);
    await api.delete(`/api/motos/${id}`); // Adicionado /api
  } catch (error) {
    console.error(
      "Erro ao deletar moto:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateMoto = async (id, motoData) => {
  try {
    const response = await api.put(`/api/motos/${id}`, motoData); // Adicionado /api
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao atualizar moto:",
      error.response?.data || error.message
    );
    throw error;
  }
};
