import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function MotoCard({ moto, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Placa: {moto.placa}</Text>
      <Text style={styles.text}>Vaga: {moto.vaga}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("MotoCard received moto:", moto.id);
          onDelete(moto.id);
        }}
      >
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#00ff7f",
    backgroundColor: "#2a2a2a",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },

  text: {
    color: "#ffffff",
    marginBottom: 5,
  },

  button: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 10,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
