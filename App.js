import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Keyboard,
  Modal,
} from "react-native";
/* importando a API */
import api from "./src/services/api";

import { MaterialIcons } from "@expo/vector-icons";

import LogoSvg from "./src/assets/track.svg";
const { width, height } = Dimensions.get("window");

import ModalActive from "./src/components/Modal";

export default function searchCep() {
  const [cep, setCep] = useState("");
  const [cepSelected, setCepSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const inputRef = useRef(null);

  function clear() {
    setCep("");
    inputRef.current.focus();
    setCepSelected(null);
  }

  async function search() {
    if (cep == "") {
      setModalVisible(true);
      setCep("");
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`);
      setCepSelected(response.data);
      Keyboard.dismiss(); //garante que o teclado seja fechado.
    } catch (error) {
      setModalVisible(true);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <LogoSvg width={width / 2} height={height / 2} />
      </View>
      <View style={{ flex: 3 }}>
        <View style={styles.header}>
          <Text style={styles.text}>Digite o cep desejado:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="12345-678"
            placeholderTextColor="#ccc"
            value={cep}
            onChangeText={(texto) => setCep(texto)}
            keyboardType="numeric"
            ref={inputRef}
            maxLength={8}
          />
        </View>

        <View style={styles.main}>
          <TouchableOpacity
            style={[styles.buttom, styles.buttomClear]}
            onPress={clear}
          >
            <Text style={styles.textButtonLimpar}>Limpar</Text>
            <MaterialIcons name="delete-outline" size={24} color="#B8B5FF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttom, { marginLeft: "10%" }]}
            onPress={search}
          >
            <Text style={styles.textButtonBuscar}>Buscar</Text>
            <MaterialIcons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Modal transparent={true} animationType="fade" visible={modalVisible}>
          <ModalActive inactive={() => setModalVisible(false)} />
        </Modal>

        {cepSelected && (
          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <Text style={styles.textInfo}>CEP:</Text>
              <Text style={styles.textResults}>{cepSelected.cep}</Text>
            </View>
            <View style={styles.footerRow}>
              <Text style={styles.textInfo}>RUA:</Text>
              <Text style={styles.textResults}>{cepSelected.logradouro}</Text>
            </View>
            <View style={styles.footerRow}>
              <Text style={styles.textInfo}>BAIRRO:</Text>
              <Text style={styles.textResults}>{cepSelected.bairro}</Text>
            </View>
            <View style={styles.footerRow}>
              <Text style={styles.textInfo}>CIDADE:</Text>
              <Text style={styles.textResults}>{cepSelected.localidade}</Text>
            </View>
            <View style={styles.footerRow}>
              <Text style={styles.textInfo}>ESTADO:</Text>
              <Text style={styles.textResults}>{cepSelected.uf}</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEEF7",
  },
  logo: {
    flex: 1,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
  },
  text: {
    marginTop: 32,
    fontSize: 24,
    fontWeight: "bold",
    color: "#7868E6",
  },
  textInput: {
    marginTop: 32,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#B8B5FF",
    borderRadius: 8,
    width: "80%",
    padding: 8,
    elevation: 2,
    fontSize: 18,
  },
  main: {
    marginTop: 32,
    alignItems: "center",
    flexDirection: "row",
    marginLeft: "10%",
    marginRight: "10%",
    justifyContent: "space-between",
  },
  buttom: {
    flex: 1,
    height: 48,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#7868E6",
    padding: 8,
    borderRadius: 8,
  },
  buttomClear: {
    marginRight: "10%",
    borderColor: "#7868e6",
    borderWidth: 2,
    backgroundColor: "transparent",
  },
  textButtonLimpar: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#B8B5FF",
  },
  textButtonBuscar: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f9f9f9",
  },
  footer: {
    marginTop: 32,
    marginLeft: "10%",
    marginRight: "10%",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInfo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7868e6",
    paddingRight: 4,
  },
  textResults: {
    fontSize: 16,
    color: "#B8B5FF",
    textAlign: "right",
  },
});
