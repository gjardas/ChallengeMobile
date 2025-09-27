import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView, 
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderCustom from '../components/HeaderCustom';
import { createMoto } from '../services/ApiService';

export default function CadastroScreen() {
  const navigation = useNavigation();
  
  // Campos do DTO
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  
  // Feedback da API
  const [vagaGerada, setVagaGerada] = useState(null);
  const [rfidGerado, setRfidGerado] = useState(null);

  // Estados de controle
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [cadastroConcluido, setCadastroConcluido] = useState(false);

  // Validações
  const placaValida = (placa) => {
    const antiga = /^[A-Z]{3}[0-9]{4}$/i;
    const mercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/i;
    return antiga.test(placa) || mercosul.test(placa);
  };
  
  const anoValido = (ano) => {
    const anoNum = Number(ano);
    // Verifica se é um número inteiro de 4 dígitos e se é >= 2020
    return ano.length === 4 && Number.isInteger(anoNum) && anoNum >= 2020;
  };

  const validarFormulario = () => {
    let erros = [];

    if (!placa.trim()) {
      erros.push('A placa é obrigatória.');
    } else if (!placaValida(placa)) {
      erros.push('Placa inválida (formato: ABC1234 ou ABC1D23).');
    }

    if (!modelo.trim()) {
      erros.push('O modelo é obrigatório.');
    }

    if (!ano.trim()) {
      erros.push('O ano é obrigatório.');
    } else if (!anoValido(ano)) {
      erros.push('O ano deve ser um número igual ou superior a 2020.');
    }

    if (erros.length > 0) {
      setErro(erros.join('\n'));
      return false;
    }

    setErro('');
    return true;
  };


  const salvar = async () => {
    if (cadastroConcluido) {
        voltarHome();
        return;
    }

    if (!validarFormulario()) {
      return;
    }

    setIsLoading(true);

    try {
      const novaMotoData = { 
        placa: placa.toUpperCase(), 
        modelo: modelo,
        ano: Number(ano),
      };

      // Chama a API para criar a moto
      const response = await createMoto(novaMotoData);

      // O backend retorna os dados gerados (vaga, rfidTag, etc.)
      setVagaGerada(response.vaga || 'N/A'); 
      setRfidGerado(response.rfidTag || 'N/A'); 
      setPlaca('');
      setModelo('');
      setAno('');
      setCadastroConcluido(true);

      Alert.alert('Sucesso', 'Moto cadastrada com sucesso!');

    } catch (error) {
      console.error('Falha ao salvar moto:', error);
      const backendError = error.response?.data?.message || 'Erro ao cadastrar a moto.';
      setErro(backendError);
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
      <HeaderCustom title="Cadastro de Moto" />

      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Cadastro de Moto</Text>

        <TextInput
          placeholder="Placa (Ex: ABC1234)"
          style={styles.input}
          value={placa}
          onChangeText={text => setPlaca(text.toUpperCase())}
          placeholderTextColor="#7f7f7f"
          editable={!cadastroConcluido}
          autoCapitalize="characters"
          maxLength={7}
        />
        
        <TextInput
          placeholder="Modelo (Ex: Honda Biz)"
          style={styles.input}
          value={modelo}
          onChangeText={setModelo}
          placeholderTextColor="#7f7f7f"
          editable={!cadastroConcluido}
          autoCapitalize="words"
        />

        <TextInput
          placeholder="Ano (Mínimo 2020)"
          style={styles.input}
          value={ano}
          onChangeText={setAno}
          placeholderTextColor="#7f7f7f"
          editable={!cadastroConcluido}
          keyboardType="numeric"
          maxLength={4}
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
            <Text style={styles.buttonText}>
              {cadastroConcluido ? 'Voltar ao Início' : 'Salvar'}
            </Text>
          )}
        </TouchableOpacity>

        {rfidGerado && vagaGerada && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              {'\u2705'} Moto cadastrada na vaga <Text style={styles.destaque}>{String(vagaGerada)}</Text>
            </Text>
            <Text style={styles.infoText}>
              RFID gerado: <Text style={styles.destaque}>{String(rfidGerado)}</Text>
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
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
    width: '50%', 
    borderWidth: 1,
    borderColor: '#00ff7f',
    backgroundColor: '#2a2a2a',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  erroTexto: {
    color: 'red',
    marginBottom: 15,
    fontSize: 14,
    textAlign: 'center',
    maxWidth: '80%',
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
    borderWidth: 1,
    borderColor: '#00ff7f',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
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