import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function Header() {
    const [userName, setUserName] = useState<string>("");
    useEffect(() => {
        async function getUserName() {
            const name = await AsyncStorage.getItem("@plantmanager:user");
            setUserName(name || '');
        }
        getUserName();
    }, [userName]);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greetings}>
                    Olá,
                </Text>
                <Text style={styles.userName}>
                    {userName}
                </Text>
            </View>
            <Image style={styles.image} source={{ uri: "https://placeimg.com/640/480/people" }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    greetings: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40
    }
});
