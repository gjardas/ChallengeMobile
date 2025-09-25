import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderCustom from '../components/HeaderCustom';
import { createMoto } from '../services/ApiService';

export default function CadastroScreen() {
  const navigation = useNavigation();
  const [placa, setPlaca] = useState('');
  const [vaga, setVaga] = useState('');
  const [rfid, setRfid] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState('');

  const placaValida = (placa) => {
    const antiga = /^[A-Z]{3}[0-9]{4}$/i;       
    const mercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/i; 
    return antiga.test(placa) || mercosul.test(placa);
  };

  const salvar = async () => {
    if (!placa.trim()) {
      setErro('Informe a placa da moto');
      return;
    }

    if (!placaValida(placa)) {
      setErro('Placa inválida (formato: ABC1234 ou ABC1D23)');
      return;
    }

    setErro('');
    setIsLoading(true); 

    try {
      const novaMotoData = { placa: placa.toUpperCase() };
      const response = await createMoto(novaMotoData);
      setPlaca('');
      setVaga(response.vaga);
      setRfid(response.rfid);
      Alert.alert('Sucesso', 'Moto cadastrada com sucesso!');

    } catch (error) {
      console.error('Falha ao salvar moto:', error);
      setErro(error.response?.data?.message || 'Erro ao cadastrar a moto.');
    } finally {
      setIsLoading(false);
    }
  };

  const voltarHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Início' }],
    });
  };

  return (
    <View style={styles.screenContainer}>
      <HeaderCustom navigation={navigation} />

      <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Moto</Text>

        <TextInput
          placeholder="Placa"
          style={styles.input}
          value={placa}
          onChangeText={text => setPlaca(text.toUpperCase())}
          placeholderTextColor="#7f7f7f"
          autoCapitalize="characters"
          maxLength={7}
        />

        {erro !== '' && (
          <Text style={styles.erroTexto}>{erro}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={salvar}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#1e1e1e" />
          ) : (
            <Text style={styles.buttonText}>Salvar</Text>
          )}
        </TouchableOpacity>

        {}
        {vaga !== '' && rfid !== '' && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              ✅ Moto cadastrada na vaga{' '}
              <Text style={styles.destaque}>{vaga}</Text>
            </Text>
            <Text style={styles.infoText}>
              RFID gerado: <Text style={styles.destaque}>{rfid}</Text>
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#00ff7f',
  },
  input: {
    width: '40%',
    borderWidth: 1,
    borderColor: '#00ff7f',
    backgroundColor: '#2a2a2a',
    padding: 12,
    marginBottom: 6,
    borderRadius: 8,
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  erroTexto: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00ff7f',
    paddingVertical: 12,
    width: '40%',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#1e1e1e',
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoBox: {
    marginTop: 25,
    alignItems: 'center',
  },
  infoText: {
    color: '#d0f0c0',
    fontSize: 16,
    marginVertical: 3,
  },
  destaque: {
    color: '#00ff7f',
    fontWeight: 'bold',
  },
});