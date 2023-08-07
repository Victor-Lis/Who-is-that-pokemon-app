import React, { useState } from 'react';
import { ScrollView, View, Text, Button, Image, TouchableOpacity, StyleSheet, TextInput, } from 'react-native';
import { login, cadastro } from '../Connections/firebaseConfig';

export default function Login({ setUserID }) {

  const [type, setType] = useState("Login")
  const [email, setEmail] = useState(null)
  const [senha, setSenha] = useState(null)

  const [loading, setLoading] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.row}>

        <Image source={Math.random() < 0.9? require("../Images/Charmander.png"): require("../Images/CharmanderShiny.png")} style={{ width: 100, height: 100 }} />
        <Image source={Math.random() < 0.9? require("../Images/Squirtle.png"): require("../Images/SquirtleShiny.png")} style={{ width: 100, height: 100 }} />

      </View>
      <View style={styles.main}>

        <Text style={styles.title}> {type.toUpperCase()} </Text>

        <View style={styles.mainContent}>

          <ScrollView style={{marginTop: 60}}>
            <View style={[styles.box]}>

              <Text style={[styles.title, { fontSize: 20 }]}> Email </Text>
              <TextInput
                style={[styles.input]}
                // placeholder=""
                onChangeText={(text) => {
                  setEmail(text)
                }
                }
                value={email}
                keyboardType='email-address'
              // maxLength={20}
              />

            </View>
            <View style={[styles.box, {marginVertical: 20}]}>

              <Text style={[styles.title, { fontSize: 20 }]}> Senha </Text>
              <TextInput
                style={[styles.input]}
                // placeholder=""
                onChangeText={(text) => {
                  setSenha(text)
                }
                }
                value={senha}
                keyboardType='visible-password'
              // maxLength={20}
              />

            </View>
            <TouchableOpacity style={[styles.button, {marginVertical: 25}]} onPress={() => {

              if(type == "Login"){

                login(email, senha, setLoading, setUserID)

              }else if(type == "Cadastro"){

                cadastro(email, senha, setLoading, setUserID)

              }

            }}>

                <Text style={styles.buttonText}> {type == "Login" ? "Fazer Login" : "Fazer Cadastro"} </Text>

            </TouchableOpacity>
          </ScrollView>

        </View>

        <View style={styles.textBox}>

          <Text style={styles.text}> {type == "Login" ? "Não possui login?" : "Possui login?"} </Text>
          <TouchableOpacity onPress={() => {

            if (type == "Login") {

              setType("Cadastro")

            } else if (type == "Cadastro") {

              setType("Login")

            }

          }}>

            <Text style={[styles.text, { color: "#50ABFF" }]}> {type == "Login" ? "Cadastre-se" : "Logar"} </Text>

          </TouchableOpacity>

        </View>

      </View>
      <View style={styles.row}>

        <Image source={Math.random() < 0.9? require("../Images/Bulbassauro.png"): require("../Images/BulbassauroShiny.png")} style={{ width: 100, height: 100 }} />
        <Image source={Math.random() < 0.9? require("../Images/Pikachu.png"): require("../Images/PikachuShiny.png")} style={{ width: 100, height: 100 }} />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 0, 0, .80)',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: "5%",
  },
  row: {

    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  main: {

    flex: 10,
    width: "97.5%",
    paddingHorizontal: "2.5%",
    paddingVertical: "15%",
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  title: {

    fontSize: 30,
    fontWeight: "bold",
    color: "#fff"

  },
  textBox: {

    alignItems: 'center',
    justifyContent: "center",
    width: "80%",
    flexDirection: "row"

  },
  text: {

    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",

  },
  mainContent: {

    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  input: {

    width: 250,
    height: 50,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255, 0.95)",
    paddingHorizontal: 10,
    paddingVertical: 2.5,

  },
  button: {

    width: 250,
    height: 50,
    borderRadius: 10,
    backgroundColor: "rgba(80,171,255, 0.9)",
    paddingHorizontal: 10,
    paddingVertical: 2.5,
    alignItems: "center",
    justifyContent: "center"

  }, 
  buttonText: {

    fontSize: 15,
    fontWeight: "bold",
    color: "rgba(255,255,255, 0.95)",

  }
});