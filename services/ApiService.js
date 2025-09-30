// services/ApiService.js
import axios from "axios";

const API_URL = "http://10.0.2.2:8080/motos";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// NOVO: Função para injetar o token JWT/Firebase nas requisições
export const setAuthToken = (token) => {
  if (token) {
    // Envia o token no formato Bearer (padrão JWT)
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Token set for API calls.");
  } else {
    // Remove o token ao fazer logout
    delete api.defaults.headers.common["Authorization"];
    console.log("Token removed for API calls.");
  }
};

// O restante das suas funções CRUD permanecem as mesmas
export const getMotos = async () => {
  // ... (seu código getMotos)
  try {
    const response = await api.get("/");
    return response.data.content; // Retorna só o array de motos
  } catch (error) {
    console.error(
      "Erro ao buscar motos:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createMoto = async (motoData) => {
  // ... (seu código createMoto)
  try {
    const response = await api.post("/", motoData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar moto:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteMoto = async (id) => {
  // ... (seu código deleteMoto)
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error(
      "Erro ao deletar moto:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateMoto = async (id, motoData) => {
  // ... (seu código updateMoto)
  try {
    const response = await api.put(`/${id}`, motoData);
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao atualizar moto:",
      error.response?.data || error.message
    );
    throw error;
  }
};
