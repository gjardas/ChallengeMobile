import {
  MD3LightTheme as LightTheme,
  MD3DarkTheme as DarkTheme,
} from "react-native-paper";

export const CustomLightTheme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    primary: "#1FA05E",
    background: "#F0F2F5",
    surface: "#F8F9FA",
    text: "#2C3E50",
    success: "#2D9760",
    error: "#D84C3E",
    warning: "#E67E22",
    secondary: "#8395A7",
    tertiary: "#A5B1C2",
    outline: "#DAE0E7",
  },
};

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#00ff7f",
    background: "#1e1e1e",
    surface: "#23272a",
    text: "#d0f0c0",
    success: "#00ff7f",
    error: "#ff4d4d",
    warning: "#F39C12",
    secondary: "#7F8C8D",
    tertiary: "#95A5A6",
    outline: "#40454E",
  },
};
