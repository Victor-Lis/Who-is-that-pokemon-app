import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Button, TextInput, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { getLast, setLast } from '../Connections/firebaseConfig'
import { StatusBar } from 'expo-status-bar';
import Feather from 'react-native-vector-icons/Feather'

export default function Home({ route }) {

  const { userID } = route.params;
  const [pokemon, setPokemon] = useState()
  const [loading, setLoading] = useState(false)
  const [gameData, setGameData] = useState()
  const [chute, setChute] = useState()
  const [showImage, setShowImage] = useState(false)
  const [tentativas, setTentativas] = useState([])
  const [visible, setVisible] = useState(false)

  const inputRef = useRef(null);

  const typeImages = {
    normal: require('../Images/Pokemon_Type_Icon_Normal.png'),
    fire: require('../Images/Pokemon_Type_Icon_Fire.png'),
    water: require('../Images/Pokemon_Type_Icon_Water.png'),
    grass: require('../Images/Pokemon_Type_Icon_Grass.png'),
    electric: require('../Images/Pokemon_Type_Icon_Electric.png'),
    ice: require('../Images/Pokemon_Type_Icon_Ice.png'),
    fighting: require('../Images/Pokemon_Type_Icon_Fighting.png'),
    poison: require('../Images/Pokemon_Type_Icon_Poison.png'),
    ground: require('../Images/Pokemon_Type_Icon_Ground.png'),
    flying: require('../Images/Pokemon_Type_Icon_Flying.png'),
    psychic: require('../Images/Pokemon_Type_Icon_Psychic.png'),
    bug: require('../Images/Pokemon_Type_Icon_Bug.png'),
    rock: require('../Images/Pokemon_Type_Icon_Rock.png'),
    ghost: require('../Images/Pokemon_Type_Icon_Ghost.png'),
    dragon: require('../Images/Pokemon_Type_Icon_Dragon.png'),
    dark: require('../Images/Pokemon_Type_Icon_Dark.png'),
    steel: require('../Images/Pokemon_Type_Icon_Steel.png'),
    fairy: require('../Images/Pokemon_Type_Icon_Fairy.png'),
  }

  async function getData() {

    setLoading(true)
    let data = await getLast(userID)
    setGameData(data)
    setChute(data.chute)
    if (data.chutesDados) {
      setTentativas(data.chutesDados)
    }
    // console.log(data)
    let url = `https://pokeapi.co/api/v2/pokemon/${data.index}`
    let pokemonData = await fetch(url).then(response => response.json())
    setPokemon(pokemonData)
    setLoading(false)

  }

  async function checkTentativa(newChute) {

    let tentativasArray = tentativas || []

    let retorno = [];

    if (!newChute) {

      return

    }

    for (let i = 0; i < newChute.length; i++) {

      if (pokemon.name.includes(newChute[i])) {

        if (pokemon.name[i] == newChute[i]) {
          retorno.push({ letra: newChute[i], status: "green" })
        } else {
          retorno.push({ letra: newChute[i], status: "orange" })
        }

      } else {

        retorno.push({ letra: newChute[i], status: "red" })

      }

    }

    if (newChute.length < pokemon.name.length) {

      retorno.push({ letra: `${newChute.length}<`, status: "red" })

    } else if (newChute.length > pokemon.name.length) {

      retorno.push({ letra: `${newChute.length}>`, status: "red" })

    } else {

      retorno.push({ letra: `${newChute.length}=`, status: "green" })

    }

    setTentativas(tentativasArray)
    
    if (!tentativasArray) {
      
      tentativasArray = []
      
    }

    tentativasArray.push(retorno)

    setGameData((prevGameData) => ({ ...prevGameData, chutesDados: tentativasArray }))
    setGameData((prevGameData) => ({ ...prevGameData, chutes: gameData.chutes + 1 }))

  }

  async function chutar() {

    if (!chute || chute == undefined || chute == undefined) {

      alert("Preencha o chute para poder realiza-ló!")
      return

    } else {

      let newChute = chute

      if(!newChute){

        alert("Preencha o chute para poder realiza-ló!")
        return

      }

      if(newChute.includes(" ")){

        newChute = chute.replace(" ", "")

      }

      checkTentativa(newChute)

      if (pokemon.name == chute) {

        setShowImage(true)
        setChute()
        alert("Parabéns!")
        setGameData((prevGameData) => ({ ...prevGameData, status: "Ganhou" }))
        await setLast(userID, gameData, true)

        setTimeout(() => {
          setShowImage(false)
          setTentativas([])
          getData()
        }, 1000)

      } else {

        if (gameData.chutes >= 3) {

          alert(`Você perdeu! Era o ${pokemon.name}`)
          setChute()
          setGameData((prevGameData) => ({ ...prevGameData, status: "Perdeu" }))
          setTimeout(async () => {
            await setLast(userID, gameData, true)
            setShowImage(false)
            setTentativas([])
            getData()
          }, 1000)

        }

        setChute()
        await setLast(userID, gameData, false)

      }

    }

  }

  useEffect(() => {

    getData()

  }, [])

  useEffect(() => {

    async function atualiza() {
      await setLast(userID, gameData)
    }

    if (tentativas.length > 0) {

      atualiza()

    }

  }, [tentativas])

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ScrollView style={{ paddingHorizontal: "3%", width: "100%" }}>
        <View style={styles.pokedexBox}>

          <View style={styles.infosBox}>

            <TouchableOpacity onPress={() => setVisible(!visible)}>

              <Feather name='help-circle' size={35} color={"#7DC1FF"} />

            </TouchableOpacity>
            <Modal visible={visible} animationType='slide' transparent={true}>

              <ScrollView style={[styles.modal]}>

                <TouchableOpacity style={styles.closeRow} onPress={() => setVisible(!visible)}>

                  <Feather style={{ alignSelf: "flex-end" }} name='x-circle' size={35} color={"#ff0000"} />

                </TouchableOpacity>

                {/* <Text style={[styles.modalTitle, {marginTop: 0}]}>Como funciona?</Text>

                  <Text style={styles.modalParagraph}>Este app é inspirado no site termo, na qual o objetivo é descobrir a palavra do dia. No caso neste app o intuito é acertar o pokemon através de algumas dicas, porém sem limitação diária. </Text> */}

                <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginVertical: "5%" }}>

                  <Image source={require("../Images/Tutorial.jpg")} style={styles.modalImage} />

                  <Text style={[styles.modalLegenda, { marginTop: "5%" }]}> <Text style={{ fontWeight: "bold" }}> 1- </Text> Acesso a tela do usuário. </Text>
                  <Text style={styles.modalLegenda}> <Text style={{ fontWeight: "bold" }}> 2- </Text> Acesso ao modal de tutorial. </Text>
                  <Text style={styles.modalLegenda}> <Text style={{ fontWeight: "bold" }}> 3- </Text> Tentativas para acertar, ao chegar a 3 ou acertar, o jogo acaba. </Text>
                  <Text style={styles.modalLegenda}> <Text style={{ fontWeight: "bold" }}> 4- </Text> Sombra do n° do pokemon, sai após o 1° chute ou acerto. </Text>
                  <Text style={styles.modalLegenda}> <Text style={{ fontWeight: "bold" }}> 5- </Text> Sombra do(s) tipo(s) do pokemon, sai após o 2° chute ou acerto. </Text>
                  <Text style={styles.modalLegenda}> <Text style={{ fontWeight: "bold" }}> 6- </Text> Sombra do do pokemon, sai após o 3° chute ou acerto. </Text>
                  <Text style={styles.modalLegenda}> <Text style={{ fontWeight: "bold" }}> 7- </Text> Campo para escrever o chute. </Text>
                  <Text style={styles.modalLegenda}> <Text style={{ fontWeight: "bold" }}> 8- </Text> Campo onde ficarão os chutes já dados pelo usuário. </Text>
                  <Text style={styles.modalLegenda}> <Text style={{ fontWeight: "bold" }}> 9- </Text> Botão para efetuar o chute escrito no campo (7). </Text>

                </View>

              </ScrollView>

            </Modal>

            <Text style={styles.infosBoxText}> {gameData && gameData.chutes <= 3? gameData.chutes: 3}/3 </Text>

          </View>

          <View style={styles.imageBox}>

            <View style={[styles.infosBox]}>

              <Text style={gameData && gameData.chutes >= 2 || showImage ? styles.infosBoxText : { backgroundColor: "#000" }}> {gameData && gameData.index} </Text>

              <View style={styles.typesBox}>
                {pokemon &&
                  pokemon.types.map(type => {
                    const imagePath = typeImages[type.type.name];

                    return (
                      <Image
                        source={imagePath}
                        style={gameData && gameData.chutes >= 3 || showImage ? styles.typeImage : [styles.typeImage, { tintColor: "#000" }]}
                        key={type.type.name}
                      />
                    );
                  })}
              </View>

            </View>

            {pokemon &&

              <Image source={{ uri: `${pokemon.sprites.front_default}` }} style={gameData && gameData.status != "Jogando" || showImage ? styles.image : [styles.image, { tintColor: "#000" }]} />
            }

          </View>

          <TextInput style={styles.input} value={chute} onChangeText={setChute} ref={inputRef} />

          <View style={styles.bottomBox}>

            <View style={styles.tentativasBox}>

              {tentativas && tentativas.length > 0 &&

                tentativas.map(tentativa => {

                  return (

                    <ScrollView style={styles.tentativa} key={Math.random()} horizontal={true}>

                      {tentativa.map((letra, index) => {

                        return <Text key={Math.random()}
                          style={index == 0 ?
                            [styles.tryText, { color: letra.status, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }] :
                            tentativa.length == index + 1 ?
                              [styles.tryText, { color: letra.status, borderTopRightRadius: 10, borderBottomRightRadius: 10 }]
                              : [styles.tryText, { color: letra.status }]
                          }> {letra.letra.toUpperCase()} </Text>

                      })}

                    </ScrollView>

                  )

                })

              }

            </View>

            <TouchableOpacity title='Chutar' onPress={chutar} style={styles.button}>

              <Text style={styles.buttonText}> Chutar </Text>

            </TouchableOpacity>

          </View>
        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: "#ECF8FF",
    justifyContent: "center",
    alignItems: "center"

  },
  pokedexBox: {

    minHeight: 690,
    height: "90%",
    width: "100%",
    backgroundColor: 'rgba(255, 0, 0, .80)',
    borderRadius: 20,
    paddingHorizontal: "3.5%",
    marginVertical: "5%"

  },
  infosBox: {

    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

  },
  modal: {

    width: "94%",
    marginHorizontal: "3%",
    marginVertical: "5%",
    backgroundColor: "rgba(255,255,255,0.975)",
    borderWidth: 1.5,
    borderColor: "#0085FF",
    borderRadius: 20,
    padding: "2.5%",
    elevation: 5,

  },
  closeRow: {

    width: "100%",
    alignItems: "center"

  },
  modalTitle: {

    width: "100%",
    fontSize: 25,
    color: "#0085FF",
    marginTop: "7.5%",
    marginBottom: "3.5%"

  },
  modalParagraph: {

    width: "98%",
    paddingLeft: "2%",
    fontSize: 15,
    color: "#000",
    textAlign: "left"

  },
  modalImage: {

    width: 350,
    height: 550,
    resizeMode: "contain",

  },
  modalLegenda: {

    textAlign: "center",
    width: "90%",
    marginVertical: "1.5%"

  },
  infosBoxText: {

    fontSize: 18.5,
    fontWeight: "bold",
    color: "#fff",

  },
  imageBox: {

    backgroundColor: "#7DC1FF",
    borderColor: "#0085FF",
    borderWidth: 1.5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 15,
    flex: 2,

  },
  typesBox: {

    flexDirection: "row",
    columnGap: 2.5,

  },
  typesBoxText: {

    fontSize: 14.5,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"

  },
  typeImage: {

    width: 25,
    height: 25,

  },
  image: {

    width: "80%",
    height: "60%",
    resizeMode: "contain",

  },
  input: {

    borderColor: "#000",
    height: 50,
    borderWidth: 1.5,
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10.5,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 10,
    textTransform: 'lowercase'

  },
  button: {

    height: 50,
    borderWidth: 1.5,
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10.5,
    borderRadius: 10,
    backgroundColor: "#0085FF",
    borderColor: "#7DC1FF",
    marginVertical: 10,
    alignItems: "center",
    alignSelf: "flex-end"

  },
  buttonText: {

    fontSize: 17.5,
    fontWeight: "bold",
    color: "#fff",

  },
  tentativasBox: {

    justifyContent: "center",
    alignItems: "center",

  },
  tentativa: {

    marginVertical: 5,

  },
  tryText: {

    padding: 2.5,
    backgroundColor: "#ffff",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
    fontSize: 20,
    margin: .1,

  },
  bottomBox: {

    justifyContent: "space-between",
    flex: 2

  }

})