import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import HeaderCustom from "../components/HeaderCustom";
import { useTheme } from "../contexts/themeContext";

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingVertical: 24,
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background,
    },
    integrantes: {
      marginTop: 32,
      fontSize: 28,
      fontWeight: "bold",
      color: theme.colors.primary,
      marginBottom: 16,
      textAlign: "center",
    },
    imageRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 24,
      gap: 24,
    },
    imageContainer: {
      alignItems: "center",
      marginHorizontal: 8,
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.surface,
    },
    imageCaption: {
      color: theme.colors.primary,
      fontSize: 14,
      textAlign: "center",
      marginBottom: 8,
      width: 120,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
      color: theme.colors.primary,
    },
    texto: {
      fontSize: 16,
      lineHeight: 24,
      textAlign: "center",
      color: theme.colors.text,
      marginBottom: 32,
      width: "90%",
      alignSelf: "center",
    },
  });

export default function SobreScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <HeaderCustom navigation={navigation} title="Sobre" />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.integrantes}>Sobre o projeto</Text>
        <Text style={styles.texto}>
          Este aplicativo foi desenvolvido para oferecer uma solução prática e
          eficiente para o gerenciamento de vagas de estacionamento de motos,
          utilizando tecnologia RFID para identificar e controlar os veículos.
          Através do app, é possível cadastrar motos com seus dados essenciais,
          visualizar uma lista organizada das motos cadastradas e acompanhar, em
          tempo real, o mapa das vagas ocupadas no estacionamento.
          {
            "\n\nO sistema facilita a administração do espaço, permitindo que os responsáveis saibam exatamente quais vagas estão livres ou ocupadas, otimizando a utilização do local e evitando conflitos ou confusões. A interface intuitiva e o uso de armazenamento local garantem que os dados estejam sempre disponíveis, mesmo sem conexão à internet.\n\nCom foco na segurança e praticidade, este projeto traz uma inovação tecnológica para o controle de acesso e monitoramento de veículos, proporcionando uma experiência mais ágil e confiável tanto para os gestores quanto para os usuários do estacionamento."
          }
        </Text>

        <Text style={styles.title}>Integrantes</Text>
        <View style={styles.imageRow}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/Guilherme.jpg")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.imageCaption}>Guilherme Jardim RM556814</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/Fernando.png")}
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
