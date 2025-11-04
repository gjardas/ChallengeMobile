import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import pt from "../locales/pt.json";
import es from "../locales/es.json";

const LANGUAGE_KEY = "@app_language";

const i18n = new I18n({
  pt,
  es,
});

// Carrega o idioma salvo ou usa o idioma do dispositivo como padrão
const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    } else {
      const deviceLanguage = getLocales()[0].languageCode;
      i18n.locale = deviceLanguage.startsWith("es") ? "es" : "pt";
    }
  } catch (error) {
    console.error("Erro ao carregar idioma:", error);
    const deviceLanguage = getLocales()[0].languageCode;
    i18n.locale = deviceLanguage.startsWith("es") ? "es" : "pt";
  }
};

// Função para alterar o idioma
export const changeLanguage = async (language) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
    i18n.locale = language;
  } catch (error) {
    console.error("Erro ao salvar idioma:", error);
  }
};

// Fallback para português se a tradução não existir
i18n.enableFallback = true;
i18n.defaultLocale = "pt";

// Carrega o idioma salvo ao inicializar
loadSavedLanguage();

// Função para obter o idioma atual
export const getCurrentLanguage = () => i18n.locale;

export default i18n;
