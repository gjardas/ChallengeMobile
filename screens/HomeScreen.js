// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderCustom from '../components/HeaderCustom';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.screenContainer}>
      <HeaderCustom title="MOTTU" />

      <View style={styles.contentContainer}>
        {/* TODO: O título foi movido para dentro do contentContainer */}
        <Text style={styles.title}>Gestão de Vagas e Motos - Mottu</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.buttonText}>Cadastrar Moto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Lista')}>
          <Text style={styles.buttonText}>Lista de Motos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Mapa')}>
          <Text style={styles.buttonText}>Mapa de Vagas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sobre')}>
          <Text style={styles.buttonText}>Sobre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ff7f',
    marginTop: 0,
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00ff7f',
    paddingVertical: 12,
    width: '30%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#1e1e1e',
    fontWeight: 'bold',
    fontSize: 18,
  },
});