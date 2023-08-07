import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getUserData } from '../Connections/firebaseConfig';
import { StatusBar } from 'expo-status-bar';

export default function User({route}) {

    const { userID } = route.params;
    const { setUserID } = route.params;
    const [datas, setDatas] = useState([])

    async function getDatas(){

        let datas = await getUserData(userID)
        setDatas(datas)
        console.log(datas)

    }

    useEffect(() => {

        getDatas()

    }, [userID])

 return (
   <View style={styles.container}>

        <StatusBar hidden={true} />

        {datas && (

            <View style={styles.contentBox}>
            
                <Text style={styles.content}> Email: {datas.email && datas.email.toLowerCase()} </Text>
                <Text style={styles.content}> Senha: {datas && datas.senha} </Text>

            </View>

        )}
        <TouchableOpacity style={styles.button} onPress={async() => 
            {
                
                setUserID()

            }}>

            <Text style={{color: "#fff"}}> Sair </Text>

        </TouchableOpacity>

   </View>
  );
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: "#ECF8FF",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: "15%"

    },
    contentBox: {

        alignItems: "center",

    },
    content: {

        marginVertical: 10,
        backgroundColor: "#7DC1FF",
        borderColor: "#0085FF",
        borderWidth: 0.5,
        paddingVertical: "2.5%",
        paddingHorizontal: "5%",
        borderRadius: 10,
        

    },
    
    button: {

        width: "20%",
        backgroundColor: "red",
        paddingVertical: "1.5%",
        paddingHorizontal: "5%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: "5%"

    }

})