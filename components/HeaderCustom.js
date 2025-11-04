import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../services/AuthContext";
import { useTheme } from "../contexts/themeContext";
import i18n from "../services/i18n";

export default function HeaderCustom({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const { logout } = useContext(AuthContext) || {};
  const toggleMenu = () => setMenuVisible(!menuVisible);
  const { mode, toggleTheme, theme } = useTheme();
  const styles = createStyles(theme);

  const navigateTo = (screen) => {
    setMenuVisible(false);
    if (navigation && navigation.navigate) {
      navigation.navigate(screen);
    } else {
      console.warn(
        `Tentativa de navegar para ${screen} sem objeto navigation válido.`
      );
    }
  };

  const handleLogout = () => {
    setMenuVisible(false);
    Alert.alert(i18n.t("auth.logout"), i18n.t("common.logoutConfirm"), [
      { text: i18n.t("common.cancel"), style: "cancel" },
      {
        text: i18n.t("auth.logout"),
        onPress: async () => {
          if (logout) await logout();
          if (navigation && navigation.navigate) {
            navigation.navigate("Login");
          }
        },
        style: "destructive",
      },
    ]);
  };

  const showBack =
    typeof navigation?.showBack === "boolean" ? navigation.showBack : true;
  const canGoBack =
    navigation && navigation.canGoBack ? navigation.canGoBack() : false;

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        {showBack && canGoBack ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("Início")}
            style={styles.backButton}
          >
            <Text style={styles.backText}>{i18n.t("common.back")}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{i18n.t("common.brand")}</Text>
        </View>

        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>{i18n.t("common.menu")}</Text>
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <View style={styles.sideMenu}>
          <TouchableOpacity
            onPress={() => navigateTo("Início")}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>{i18n.t("menu.home")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateTo("Cadastro")}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>
              {i18n.t("menu.registerMotorcycle")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateTo("Lista")}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>{i18n.t("menu.motorcycleList")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateTo("Mapa")}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>{i18n.t("menu.parkingMap")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateTo("Sobre")}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>{i18n.t("menu.about")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTheme} style={styles.menuItem}>
            <Text style={styles.menuText}>
              {mode === "light"
                ? i18n.t("common.theme.toggleDark")
                : i18n.t("common.theme.toggleLight")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            style={[styles.menuItem, styles.logoutItem]}
          >
            <Text style={[styles.menuText, styles.logoutText]}>
              {i18n.t("common.logout")}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    headerContainer: {
      backgroundColor: theme.colors.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.primary,
      zIndex: 10,
    },
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
    },
    backButton: {
      padding: 5,
    },
    backPlaceholder: {
      width: 70,
    },
    backText: {
      color: theme.colors.primary,
      fontSize: 16,
    },
    titleContainer: {
      flex: 1,
      alignItems: "center",
    },
    titleText: {
      color: theme.colors.primary,
      fontSize: 22,
      fontWeight: "bold",
      fontFamily: "Courier New",
    },
    menuButton: {
      backgroundColor: theme.colors.primary,
      padding: 8,
      borderRadius: 5,
    },
    menuButtonText: {
      color: theme.colors.background,
      fontWeight: "bold",
      fontSize: 16,
    },
    sideMenu: {
      position: "absolute",
      right: 10,
      top: 120,
      backgroundColor: theme.colors.surface,
      width: 200,
      paddingVertical: 10,
      paddingLeft: 10,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      borderLeftWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.primary,
      zIndex: 20,
    },
    menuItem: {
      paddingVertical: 8,
    },
    menuText: {
      color: theme.colors.primary,
      fontSize: 16,
    },
    logoutItem: {
      borderTopWidth: 1,
      borderTopColor: "#444",
      marginTop: 5,
      paddingTop: 10,
    },
    logoutText: {
      color: "#ff4d4d",
      fontWeight: "bold",
    },
  });
