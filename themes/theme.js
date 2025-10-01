import {
  MD3LightTheme as LightTheme,
  MD3DarkTheme as DarkTheme,
} from "react-native-paper";

export const CustomLightTheme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    // Verde mais escuro e menos saturado
    primary: "#1FA05E",
    // Fundo com tom mais quente e menos brilhante
    background: "#F0F2F5",
    // Superfície com leve tom para reduzir brilho
    surface: "#F8F9FA",
    // Texto escuro para melhor legibilidade
    text: "#2C3E50",
    // Cores adicionais para estados (mais suaves)
    success: "#2D9760",
    error: "#D84C3E",
    warning: "#E67E22",
    // Cores para elementos secundários (mais suaves)
    secondary: "#8395A7",
    tertiary: "#A5B1C2",
    // Cor para bordas e divisores (mais suave)
    outline: "#DAE0E7",
  },
};

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    // Verde original da Mottu
    primary: "#00ff7f",
    // Fundo escuro original
    background: "#1e1e1e",
    // Superfície um pouco mais clara
    surface: "#23272a",
    // Texto claro com tom esverdeado
    text: "#d0f0c0",
    // Cores adicionais para estados
    success: "#00ff7f",
    error: "#ff4d4d",
    warning: "#F39C12",
    // Cores para elementos secundários
    secondary: "#7F8C8D",
    tertiary: "#95A5A6",
    // Cor para bordas e divisores
    outline: "#40454E",
  },
};
