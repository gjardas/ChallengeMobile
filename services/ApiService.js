import axios from "axios";

const API_URL = "http://192.168.1.128:8080/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Token set for API calls.");
  } else {
    delete api.defaults.headers.common["Authorization"];
    console.log("Token removed for API calls.");
  }
};

export const getMotos = async () => {
  try {
    const response = await api.get("/motos");
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
    const response = await api.post("/motos", motoData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar moto:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteMoto = async (id) => {
  try {
    console.log("Deleting moto with ID:", id);
    await api.delete(`/motos/${id}`);
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
    const response = await api.put(`/motos/${id}`, motoData);
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao atualizar moto:",
      error.response?.data || error.message
    );
    throw error;
  }
};
