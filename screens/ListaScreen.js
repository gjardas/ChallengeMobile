import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HeaderCustom from "../components/HeaderCustom";
import { getMotos, deleteMoto } from "../services/ApiService";
import { useTheme } from "../contexts/themeContext";
import i18n from "../services/i18n";

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    itemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      marginBottom: 10,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
    },
    itemTextContainer: {
      flex: 1,
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    itemSubtitle: {
      fontSize: 14,
      color: theme.colors.text,
      opacity: 0.7,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 10,
    },
    editButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
      marginRight: 5,
    },
    deleteButton: {
      backgroundColor: theme.colors.error,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
    },
    noMotosContainer: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    noMotosText: {
      color: theme.colors.text,
      fontSize: 16,
      textAlign: "center",
    },
  });

export default function ListaScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [motos, setMotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const styles = createStyles(theme);

  const carregarMotos = async () => {
    setIsLoading(true);
    try {
      const data = await getMotos();
      setMotos(data || []);
    } catch (error) {
      console.error("Falha ao carregar motos:", error);
      Alert.alert(i18n.t("common.error"), i18n.t("motorcycle.loadError"));
      setMotos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const excluirMoto = async (id) => {
    console.log("Excluindo moto com ID:", id);
    try {
      await deleteMoto(id);
      Alert.alert(i18n.t("common.success"), i18n.t("motorcycle.deleteSuccess"));
      carregarMotos();
    } catch (error) {
      console.error("Falha ao excluir a moto:", error);
      Alert.alert(i18n.t("common.error"), i18n.t("motorcycle.deleteError"));
    }
  };

  const confirmarExclusao = (placa) => {
    Alert.alert(
      i18n.t("common.confirm"),
      i18n.t("motorcycle.deleteConfirm", { plate: placa }),
      [
        {
          text: i18n.t("common.cancel"),
          style: "cancel",
        },
        {
          text: i18n.t("common.delete"),
          onPress: () => excluirMoto(placa),
          style: "destructive",
        },
      ]
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarMotos();
      return () => {};
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>
          {i18n.t("motorcycle.plate")}: {item.placa}
        </Text>
        <Text style={styles.itemSubtitle}>
          {i18n.t("motorcycle.model")}: {item.modelo}
        </Text>
        <Text style={styles.itemSubtitle}>
          {i18n.t("motorcycle.year")}: {item.ano}
        </Text>
        <Text style={styles.itemSubtitle}>
          {i18n.t("motorcycle.rfid")}: {item.rfidTag || item.rfid}
        </Text>
        <Text style={styles.itemSubtitle}>
          {i18n.t("motorcycle.status")}: {item.status || "N/A"}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("Editar", { moto: item })}
        >
          <Ionicons name="create-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => confirmarExclusao(item.id)}
        >
          <Ionicons name="trash-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <HeaderCustom
        navigation={navigation}
        title={i18n.t("motorcycle.motorcycleList")}
      />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <FlatList
            data={
              Array.isArray(motos)
                ? motos.filter((m) => m.placa && m.placa.trim() !== "")
                : []
            }
            keyExtractor={(item, index) =>
              String(item.placa || item.id || index)
            }
            renderItem={renderItem}
            contentContainerStyle={
              motos.length === 0 ? styles.noMotosContainer : null
            }
            ListEmptyComponent={() => (
              <Text style={styles.noMotosText}>
                {i18n.t("motorcycle.noMotorcycles")}
              </Text>
            )}
          />
        )}
      </View>
    </View>
  );
}
