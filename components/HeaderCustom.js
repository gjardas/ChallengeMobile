// components/HeaderCustom.js
import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../services/AuthContext';

export default function HeaderCustom({ title = "MOTTU" }) {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const insets = useSafeAreaInsets();
  
  const authContext = useContext(AuthContext); 
  const { logout, isLoggedIn } = authContext || {}; 
  
  const toggleMenu = () => setMenuVisible(!menuVisible);

  const navigateTo = (screen) => {
    setMenuVisible(false);
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    setMenuVisible(false);
    await logout();
  };

  const canGoBack = navigation.canGoBack();

  const menuItems = [
    { name: 'Início', screen: 'Início' },
    { name: 'Cadastrar Moto', screen: 'Cadastro' },
    { name: 'Lista de Motos', screen: 'Lista' },
    { name: 'Mapa de Vagas', screen: 'Mapa' },
    { name: 'Sobre', screen: 'Sobre' },
  ];

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        {canGoBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>← Voltar</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>☰ Menu</Text>
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <View style={styles.sideMenu}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.screen}
              onPress={() => navigateTo(item.screen)} 
              style={styles.menuItem}
            >
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
          
          {isLoggedIn && (
            <TouchableOpacity key="Logout" onPress={handleLogout} style={styles.menuItem}>
              <Text style={styles.menuText}>Sair</Text>
            </TouchableOpacity>
          )}
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