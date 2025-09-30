// routes/auth.routes.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen"; // Deve ser criado
import CadastroUsuarioScreen from "../screens/CadastroUsuarioScreen"; // Deve ser criado

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }} // Sem cabeçalho nas telas de Auth
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CadastroUsuario" component={CadastroUsuarioScreen} />
    </Stack.Navigator>
  );
}
