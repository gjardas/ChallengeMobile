import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HeaderCustom({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const navigateTo = (screen) => {
    setMenuVisible(false);
    navigation.navigate(screen);
  };

  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topBar}>
        {canGoBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>← Voltar</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        {/* Texto "MOTTU" centralizado */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>MOTTU</Text>
        </View>

        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>☰ Menu</Text>
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <View style={styles.sideMenu}>
          <TouchableOpacity onPress={() => navigateTo('Início')} style={styles.menuItem}>
            <Text style={styles.menuText}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo('Cadastro')} style={styles.menuItem}>
            <Text style={styles.menuText}>Cadastrar Moto</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo('Lista')} style={styles.menuItem}>
            <Text style={styles.menuText}>Lista de Motos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo('Mapa')} style={styles.menuItem}>
            <Text style={styles.menuText}>Mapa de Vagas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo('Sobre')} style={styles.menuItem}>
            <Text style={styles.menuText}>Sobre</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#1e1e1e',
    borderBottomWidth: 1,
    borderBottomColor: '#00ff7f',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    padding: 5,
  },
  backPlaceholder: {
    width: 70,
  },
  backText: {
    color: '#00ff7f',
    fontSize: 16,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    color: '#00ff7f',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Courier New',
  },
  menuButton: {
    backgroundColor: '#00ff7f',
    padding: 8,
    borderRadius: 5,
  },
  menuButtonText: {
    color: '#1e1e1e',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sideMenu: {
    backgroundColor: '#2a2a2a',
    paddingVertical: 10,
    paddingLeft: 10,
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuText: {
    color: '#00ff7f',
    fontSize: 16,
  },
});
