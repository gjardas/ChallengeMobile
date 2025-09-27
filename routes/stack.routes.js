import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderCustom from "../components/HeaderCustom";

import HomeScreen from "../screens/HomeScreen";
import CadastroScreen from "../screens/CadastroScreen";
import ListaScreen from "../screens/ListaScreen";
import MapaScreen from "../screens/MapaScreen";
import SobreScreen from "../screens/SobreScreen";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Início"
      screenOptions={({ route }) => ({
        header: () => (
          <HeaderCustom
            title={route.name === "Início" ? "Mottu" : route.name}
          />
        ),
      })}
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
