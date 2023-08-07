import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather'

export default function Header({ title }) {

    const navigation = useNavigation()
    const [canGoBack, setCanGoBack] = useState(false)

    useEffect(() => {

        setCanGoBack(navigation.canGoBack())

    }, [title])

    return (
        <View style={styles.container}>

            <Image source={require("../Images/LogoL.png")} style={{ width: 75, height: 75 }} />

            <Text style={{ color: "#fff", fontSize: 17.5, fontWeight: "bold" }}> {title.toUpperCase()} </Text>
            {canGoBack ? (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ padding: 10 }}
                >
                    <Feather name="corner-down-left" size={35} color={"#fff"} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => navigation.push("User")}
                    style={{ padding: 10 }}
                >
                    <Feather name="user" size={35} color={"#fff"} />
                </TouchableOpacity>
            )}

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: "2.5%",
        backgroundColor: 'rgba(255, 0, 0, .80)',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: "#ECF8FF",
        borderBottomWidth: 2.5,
        elevation: .5,
    },
});