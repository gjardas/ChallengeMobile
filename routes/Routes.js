import React, { useContext } from "react";
import { AuthContext } from "../services/AuthContext";
import StackRoutes from "./stack.routes";
import AuthRoutes from "./Auth.routes";

export default function Routes() {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <StackRoutes /> : <AuthRoutes />;
}
