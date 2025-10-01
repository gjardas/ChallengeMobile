import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider, useTheme } from "./contexts/themeContext";
import HomeScreen from "./screens/HomeScreen";
import CadastroScreen from "./screens/CadastroScreen";
import ListaScreen from "./screens/ListaScreen";
import MapaScreen from "./screens/MapaScreen";
import SobreScreen from "./screens/SobreScreen";
import EditarScreen from "./screens/EditarScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastroUsuarioScreen from "./screens/CadastroUsuarioScreen";

const Stack = createNativeStackNavigator();

function MainApp() {
  const { theme } = useTheme();
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={({ navigation, route }) => ({
            headerShown: false,
          })}
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="CadastroUsuario"
            component={CadastroUsuarioScreen}
          />
          <Stack.Screen name="Início" component={HomeScreen} />
          <Stack.Screen name="Editar" component={EditarScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="Lista" component={ListaScreen} />
          <Stack.Screen name="Mapa" component={MapaScreen} />
          <Stack.Screen name="Sobre" component={SobreScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
