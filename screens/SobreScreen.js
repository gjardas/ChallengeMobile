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
import i18n from "../services/i18n";

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
      <HeaderCustom navigation={navigation} title={i18n.t("menu.about")} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.integrantes}>{i18n.t("about.aboutTitle")}</Text>
        <Text style={styles.texto}>
          {i18n.t("about.aboutText")}
          {"\n\n"}
          {i18n.t("about.aboutText2")}
          {"\n\n"}
          {i18n.t("about.aboutText3")}
        </Text>

        <Text style={styles.title}>{i18n.t("about.members")}</Text>
        <View style={styles.imageRow}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/Guilherme.jpg")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.imageCaption}>
              {i18n.t("about.memberGuilherme")}
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/Fernando.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.imageCaption}>
              {i18n.t("about.memberFernando")}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
