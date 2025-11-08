import React, { useEffect } from "react"; // Importe o useEffect
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

// Importe o setAuthToken
import { setAuthToken } from "./services/ApiService";

const Stack = createNativeStackNavigator();

// Defina sua chave de API
const SUA_API_KEY = "HlqyN5CN0oWvjaD82XPpr0tPvmSXrWyQ";

function MainApp() {
  const { theme } = useTheme();

  // Adicione o useEffect para definir a chave UMA VEZ
  useEffect(() => {
    console.log("APP.JS: Configurando a X-API-KEY global...");
    setAuthToken(SUA_API_KEY);
  }, []); // O array vazio [] garante que isso rode só uma vez.

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={({ navigation, route }) => ({
            headerShown: false,
          })}
          initialRouteName="Login"
        >
          {/* A PARTIR DAQUI, SÓ PODE HAVER <Stack.Screen> */}
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
