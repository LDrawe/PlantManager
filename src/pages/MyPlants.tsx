import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import PlantCardSecondary from '../components/PlantCardSecondary';
import Header from '../components/Header';
import WaterDrop from '../assets/waterdrop.png';
import { PlantProps, loadPlants } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

export default function MyPlants() {

    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWater, setNextWater] = useState<string>('');

    useEffect(() => {
        async function loadStorageData() {
            const plantsStored = await loadPlants();
            const nextTime = formatDistance(
                new Date(plantsStored[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );
            setNextWater(`Não esqueça de regar a ${plantsStored[0].name} em ${nextTime}.`)
            setMyPlants(plantsStored);
            setLoading(false);
        }
        loadStorageData();

    }, []);

    return (
        <View style={styles.container} >
            <Header />
            <View style={styles.spotLight}>
                <Image
                    source={WaterDrop}
                    style={styles.spotLightImage}
                />
                <Text style={styles.spotLightText}>
                    {nextWater}
                </Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>
                <FlatList
                    data={myPlants}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item}) => (
                        <PlantCardSecondary data={item}/>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotLight: {
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotLightImage: {
        width: 60,
        height: 60
    },
    spotLightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%',
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginTop: 20,
        marginBottom: 10
    },
});
