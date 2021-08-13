import React, { useState } from 'react';
import {
    Alert,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core';
import colors from '../styles/colors';
import WaterDrop from '../assets/waterdrop.png';
import Button from '../components/Button';
import fonts from '../styles/fonts';
import { PlantProps, savePlant } from '../libs/storage';

interface Params {
    plant: PlantProps
}

export default function PlantSave() {

    const navigation = useNavigation<any>();
    const route = useRoute();
    const { plant } = route.params as Params;

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS == 'android') {
            setShowDatePicker(oldState => !oldState);
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Aviso', 'Escolha uma hora no futuro! ⏲️');
        }

        if (dateTime) {
            setSelectedDateTime(dateTime);
        }
    }

    function handleOpenDateTimePickerforAndroid(){
        setShowDatePicker(oldState => !oldState);
    }

    async function handleSave(){
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            });
            navigation.navigate("Confirmation", {
				title: 'Tudo certo',
				subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
				buttonTitle: 'Muito Obrigado!',
				icon: 'hug',
				nextScreen: 'MyPlants'
			});
        } catch (error) {
            return Alert.alert('Ocorreu um problema', 'Não foi possível salvar sua planta! 😢');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}
                />

                <Text style={styles.plantName}>
                    {plant.name}
                </Text>

                <Text style={styles.plantAbout}>
                    {plant.about}
                </Text>

            </View>

            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image source={WaterDrop} style={styles.tipImage} />

                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>
                
                <Text style={styles.alertLabel}>
                    Escolha o melhor horário para ser lembrado:
                </Text>

                {
                    showDatePicker ?
                        <DateTimePicker
                            value={selectedDateTime}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeTime}
                        /> : null
                }

                {
                    Platform.OS == 'android' ?
                        <TouchableOpacity style={styles.dateTimePickerButton} onPress={handleOpenDateTimePickerforAndroid}>
                            <Text style={styles.dateTimePickerText}>
                                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                            </Text>
                        </TouchableOpacity>
                        : null
                }

                <Button title="Cadastrar planta" onPress={handleSave} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,
    },
    controller: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        // position: 'relative',
        // bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 12,
        marginTop: 25,
    },
    dateTimePickerButton:{
        alignItems: 'center',
        paddingVertical: 30,
        marginVertical: 10,
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
});