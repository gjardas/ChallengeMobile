// routes/stack.routes.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Importe todas as suas telas
import HomeScreen from "../screens/HomeScreen";
import CadastroScreen from "../screens/CadastroScreen";
import ListaScreen from "../screens/ListaScreen";
import EditarScreen from "../screens/EditarScreen"; // Supondo que você criou essa tela
import MapaScreen from "../screens/MapaScreen";
import SobreScreen from "../screens/SobreScreen";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Início"
      screenOptions={{
        headerShown: false, // Desabilita o header padrão para usarmos o HeaderCustom dentro das telas
      }}
    >
      <Stack.Screen name="Início" component={HomeScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="Lista" component={ListaScreen} />
      <Stack.Screen name="Editar" component={EditarScreen} />
      <Stack.Screen name="Mapa" component={MapaScreen} />
      <Stack.Screen name="Sobre" component={SobreScreen} />
    </Stack.Navigator>
  );
}
