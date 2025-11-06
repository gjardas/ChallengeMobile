import * as Notifications from "expo-notifications";
import { Platform, Alert } from "react-native";

/**
 * Define o comportamento da notificação quando o app está aberto (em primeiro plano).
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    // --- CORREÇÃO DO AVISO ---
    // 'shouldShowAlert: true' está obsoleto (deprecated)
    // As novas propriedades são 'shouldShowBanner' (iOS) e 'shouldShowList' (Android)
    shouldShowBanner: true,
    shouldShowList: true,
    // --- FIM DA CORREÇÃO ---

    shouldPlaySound: true, // Toca um som
    shouldSetBadge: false, // Não altera o ícone do app
  }),
});

/**
 * Pede permissão para notificações.
 * Isto FUNCIONA no Expo Go.
 */
export async function askNotificationPermission() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // Pede permissão se ainda não foi concedida
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // Lida com a recusa
  if (finalStatus !== "granted") {
    Alert.alert(
      "Permissão Negada",
      "Não é possível enviar notificações sem permissão."
    );
    return false;
  }

  // Configuração obrigatória para Android (Canal de Notificação)
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#00ff7f",
    });
  }

  return true;
}

/**
 * Dispara uma notificação LOCAL imediatamente.
 * Isto FUNCIONA no Expo Go.
 * Esta é uma implementação de um "lembrete" ou "gatilho".
 */
export async function sendLocalNotification(title, body) {
  // Verifica a permissão antes de enviar
  const hasPermission = await askNotificationPermission();

  if (!hasPermission) {
    // O askNotificationPermission() já mostra um Alert, não precisa de outro.
    return;
  }

  // Agenda a notificação
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title || "Mottu App 🛵",
      body: body || "Uma nova moto foi cadastrada!",
      data: { url: "app://Lista" }, // (Opcional) dados para onde navegar
    },
    trigger: null, // 'null' significa "disparar agora"
  });

  console.log("Notificação local disparada!");
}
