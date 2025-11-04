import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import i18n from "../services/i18n";
import HomeScreen from "../screens/HomeScreen";
import CadastroScreen from "../screens/CadastroScreen";
import ListaScreen from "../screens/ListaScreen";
import EditarScreen from "../screens/EditarScreen";
import MapaScreen from "../screens/MapaScreen";
import SobreScreen from "../screens/SobreScreen";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName={i18n.t("menu.home")}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={i18n.t("menu.home")} component={HomeScreen} />
      <Stack.Screen name={i18n.t("menu.register")} component={CadastroScreen} />
      <Stack.Screen name={i18n.t("menu.list")} component={ListaScreen} />
      <Stack.Screen name={i18n.t("menu.edit")} component={EditarScreen} />
      <Stack.Screen name={i18n.t("menu.map")} component={MapaScreen} />
      <Stack.Screen name={i18n.t("menu.about")} component={SobreScreen} />
    </Stack.Navigator>
  );
}
