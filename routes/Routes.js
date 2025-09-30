// routes/Routes.js
import React, { useContext } from "react";
import { AuthContext } from "../services/AuthContext";
import StackRoutes from "./stack.routes"; // Rotas do app logado
import AuthRoutes from "./auth.routes"; // Rotas de Login/Cadastro

export default function Routes() {
  const { isLoggedIn } = useContext(AuthContext);

  // Se estiver logado, mostra o Stack do App. Senão, mostra o Stack de Autenticação.
  return isLoggedIn ? <StackRoutes /> : <AuthRoutes />;
}
