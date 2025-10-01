import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../services/AuthContext";

export default function HeaderCustom({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const { logout } = useContext(AuthContext) || {};
  const toggleMenu = () => setMenuVisible(!menuVisible);

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
    Alert.alert("Sair", "Você tem certeza que deseja fazer logout?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
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

  // Permitir esconder botão voltar via prop
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
            <Text style={styles.backText}>← Voltar</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>MOTTU</Text>
        </View>

        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>☰ Menu</Text>
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <View style={styles.sideMenu}>
          <TouchableOpacity
            onPress={() => navigateTo("Início")}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateTo("Cadastro")}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>Cadastrar Moto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateTo("Lista")}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>Lista de Motos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateTo("Mapa")}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>Mapa de Vagas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateTo("Sobre")}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>Sobre</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            style={[styles.menuItem, styles.logoutItem]}
          >
            <Text style={[styles.menuText, styles.logoutText]}>
              Sair (Logout)
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#1e1e1e",
    borderBottomWidth: 1,
    borderBottomColor: "#00ff7f",
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
    color: "#00ff7f",
    fontSize: 16,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    color: "#00ff7f",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
  menuButton: {
    backgroundColor: "#00ff7f",
    padding: 8,
    borderRadius: 5,
  },
  menuButtonText: {
    color: "#1e1e1e",
    fontWeight: "bold",
    fontSize: 16,
  },
  sideMenu: {
    position: "absolute",
    right: 10,
    top: 120,
    backgroundColor: "#2a2a2a",
    width: 200,
    paddingVertical: 10,
    paddingLeft: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#00ff7f",
    zIndex: 20,
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuText: {
    color: "#00ff7f",
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
