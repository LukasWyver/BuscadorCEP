import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

export default function ModalActive({ inactive }) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={inactive}>
        <View style={styles.modalClose}></View>
      </TouchableWithoutFeedback>

      <View style={styles.modalContent}>
        <Text style={styles.error}>ATENÇÃO:</Text>
        <Text style={{ textAlign: "center" }}>
          Você ainda não preencheu um CEP válido.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(23,23,23,.9)",
  },
  modalClose: {
    flex: 4,
  },
  modalContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    backgroundColor: "#EDEEF7",
    marginHorizontal: "15%",
    marginTop: "-100%",
    marginBottom: "50%",
    borderRadius: 8,
    zIndex: 5,
    elevation: 2,
  },
  error: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#B91646",
    marginBottom: "5%",
  },
});
