import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Dimensions, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderCustom from '../components/HeaderCustom';

const CARD_WIDTH = 250;

export default function ListaScreen({ navigation }) {
  const [motos, setMotos] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const data = await AsyncStorage.getItem('motos');
      if (data) setMotos(JSON.parse(data));
    };
    carregar();
  }, []);

  const excluir = async (placa) => {
    const novas = motos.filter(moto => moto.placa !== placa);
    await AsyncStorage.setItem('motos', JSON.stringify(novas));
    setMotos(novas);
  };

  // Array com as vagas ocupadas
  const vagasOcupadas = motos.map(moto => String(moto.vaga));

  return (
    <View style={styles.container}>

      <HeaderCustom navigation={navigation} title="Lista" />

      <Button
        title="Ver Mapa de Vagas"
        onPress={() => navigation.navigate('Mapa', { ocupadasVagas: vagasOcupadas })}
        color="#00cc44"
      />

      <FlatList
        data={motos}
        keyExtractor={(item) => item.placa}
        numColumns={Math.floor(Dimensions.get('window').width / (CARD_WIDTH + 16))}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>Placa: {item.placa}</Text>
            <Text style={styles.text}>Vaga: {item.vaga}</Text>
            <Text style={styles.text}>RFID: {item.rfid}</Text>
            <TouchableOpacity
              style={styles.buttonExcluir}
              onPress={() => excluir(item.placa)}
            >
              <Text style={styles.textExcluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },

  listContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  card: {
    width: CARD_WIDTH,
    maxHeight: 180,
    borderWidth: 1,
    borderColor: '#00ff7f',
    backgroundColor: '#2a2a2a',
    padding: 12,
    margin: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#d0f0c0',
    fontSize: 16,
    marginVertical: 6,
    textAlign: 'center',
  },

  buttonExcluir: {
    marginTop: 15,
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  textExcluir: {
    color: '#1e1e1e',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
