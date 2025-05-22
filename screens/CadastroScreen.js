import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderCustom from '../components/HeaderCustom';

export default function CadastroScreen({ navigation }) {
  const [placa, setPlaca] = useState('');
  const [motos, setMotos] = useState([]);
  const [vagaGerada, setVagaGerada] = useState(null);
  const [rfidGerado, setRfidGerado] = useState(null);
  const [cadastroConcluido, setCadastroConcluido] = useState(false);
  const [erroPlaca, setErroPlaca] = useState('');

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('motos');
      if (data) setMotos(JSON.parse(data));
    })();
  }, []);

  const placaValida = (placa) => {
    const antiga = /^[A-Z]{3}[0-9]{4}$/i;       // Ex: ABC1234
    const mercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/i; // Ex: ABC1D23
    return antiga.test(placa) || mercosul.test(placa);
  };

  const gerarRFID = () =>
    'RFID-' + Math.floor(100000 + Math.random() * 900000);

  const gerarVagaLivre = () => {
    const ocupadas = motos.map(m => m.vaga);
    for (let i = 1; i <= 25; i++) {
      if (!ocupadas.includes(i.toString())) {
        return i.toString();
      }
    }
    return null;
  };

  const salvar = async () => {
    if (!placa.trim()) {
      setErroPlaca('Informe a placa da moto');
      return;
    }

    if (!placaValida(placa)) {
      setErroPlaca('Placa inválida (formato: ABC1234 ou ABC1D23)');
      return;
    }

    setErroPlaca('');

    const vaga = gerarVagaLivre();
    if (!vaga) {
      setErroPlaca('Todas as vagas estão ocupadas');
      return;
    }

    const rfid = gerarRFID();
    const novaMoto = { placa, vaga, rfid };
    const novas = [...motos, novaMoto];

    await AsyncStorage.setItem('motos', JSON.stringify(novas));
    setMotos(novas);

    setVagaGerada(vaga);
    setRfidGerado(rfid);
    setPlaca('');
    setCadastroConcluido(true);
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
          editable={!cadastroConcluido}
          autoCapitalize="characters"
          maxLength={7}
        />

        {erroPlaca !== '' && (
          <Text style={styles.erroTexto}>{erroPlaca}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={cadastroConcluido ? voltarHome : salvar}
        >
          <Text style={styles.buttonText}>
            {cadastroConcluido ? 'Voltar ao Início' : 'Salvar'}
          </Text>
        </TouchableOpacity>

        {rfidGerado && vagaGerada && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              ✅ Moto cadastrada na vaga{' '}
              <Text style={styles.destaque}>{vagaGerada}</Text>
            </Text>
            <Text style={styles.infoText}>
              RFID gerado: <Text style={styles.destaque}>{rfidGerado}</Text>
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
