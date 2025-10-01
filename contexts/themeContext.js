import React, { createContext, useContext, useState } from "react";
import { CustomLightTheme, CustomDarkTheme } from "../themes/theme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  const theme = mode === "dark" ? CustomDarkTheme : CustomLightTheme;

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
