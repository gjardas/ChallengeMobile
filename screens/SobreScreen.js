import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import HeaderCustom from '../components/HeaderCustom';

export default function SobreScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#1e1e1e' }}>
      <HeaderCustom title="Sobre" />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.integrantes}>Sobre o projeto</Text>
        <Text style={styles.texto}>
          Este aplicativo foi desenvolvido para oferecer uma solução prática e eficiente para o gerenciamento de vagas de estacionamento de motos, utilizando tecnologia RFID para identificar e controlar os veículos. Através do app, é possível cadastrar motos com seus dados essenciais, visualizar uma lista organizada das motos cadastradas e acompanhar, em tempo real, o mapa das vagas ocupadas no estacionamento.
          {'\n\n'}
          O sistema facilita a administração do espaço, permitindo que os responsáveis saibam exatamente quais vagas estão livres ou ocupadas, otimizando a utilização do local e evitando conflitos ou confusões. A interface intuitiva e o uso de armazenamento local garantem que os dados estejam sempre disponíveis, mesmo sem conexão à internet.
          {'\n\n'}
          Com foco na segurança e praticidade, este projeto traz uma inovação tecnológica para o controle de acesso e monitoramento de veículos, proporcionando uma experiência mais ágil e confiável tanto para os gestores quanto para os usuários do estacionamento.
        </Text>

        <Text style={styles.title}>Integrantes</Text>
        <View style={styles.imageRow}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/Guilherme.jpg')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.imageCaption}>Guilherme Jardim RM556814</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/Fernando.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.imageCaption}>Fernando RM555317</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  integrantes: {
    marginTop: 40,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#00ff7f',
    marginBottom: 10,
    textAlign: 'center',
  },

  imageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 200,
    marginBottom: 30,
  },

  imageContainer: {
    alignItems: 'center',
  },

  image: {
    width: 270,
    height: 270,
    borderRadius: 8,
    marginBottom: 6,
  },

  imageCaption: {
    color: '#00ff7f',
    fontSize: 14,
    textAlign: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00ff7f',
  },

  texto: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#d0f0c0',
    marginBottom: 40,
  },
});
