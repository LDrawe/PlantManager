import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlantCardSecondary from '../components/PlantCardSecondary';
import Header from '../components/Header';
import Load from '../components/Load';
import WaterDrop from '../assets/waterdrop.png';
import { PlantProps, loadPlants, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns/esm';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { SvgFromUri } from 'react-native-svg';

export default function MyPlants() {

    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [nextWater, setNextWater] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(true);
    const [modalShown, setModalShown] = useState<boolean>(false);

    const [modalPlant, setModalPlant] = useState<PlantProps>(myPlants[0]);

    function handleModal(plant: PlantProps) {
        setModalPlant(plant);
        setModalShown(true);
    }

    async function handleRemove(plant: PlantProps) {
        try {
            await removePlant(plant.id);
            setMyPlants(oldData => oldData.filter(plants => plants.id != plant.id));
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível remover! 😢');
        }
    }

    useEffect(() => {
        let isMounted = true;

        async function loadStorageData() {

            const plantsStored = await loadPlants();

            if (plantsStored.length > 0) {
                const now = new Date().getTime();
                let i = 0;
                let isThereAFutureNotification = false;

                while (i < plantsStored.length && !isThereAFutureNotification) {
                    const itemNotification = new Date(plantsStored[i].dateTimeNotification).getTime();

                    if (itemNotification > now) {
                        isThereAFutureNotification = true;
                    }
                    else {
                        i++;
                    }
                }
                if (!isThereAFutureNotification) {
                    i = plantsStored.length - 1;
                }
                const plantTimeNotification = new Date(plantsStored[i].dateTimeNotification).getTime();
                const nextTime = formatDistance(
                    plantTimeNotification,
                    now,
                    { locale: pt }
                );
                if (isMounted) {
                    setNextWater(
                        plantTimeNotification > now ?
                            `Não esqueça de regar a ${plantsStored[i].name} em ${nextTime}.`
                            :
                            `A hora de regar a ${plantsStored[i].name} foi à ${nextTime}.`);
                    setMyPlants(plantsStored);
                    setLoading(false);
                }
            }
        }

        loadStorageData();

        return () => {
            isMounted = false;
        }
    }, []);

    if (loading)
        <Load />

    return (
        <SafeAreaView style={styles.container} >
            <Header />
            {
                myPlants.length > 0 ?
                    <View style={styles.wrapper}>

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
                            <Modal
                                animationType="fade"
                                statusBarTranslucent
                                transparent
                                visible={modalShown}
                                onRequestClose={() => {
                                    setModalShown(false);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <View style={styles.modalSVG}>
                                            <SvgFromUri uri={modalPlant ? modalPlant.photo : ''} width={100} height={100} />
                                        </View>

                                        <Text style={styles.modalText}>
                                            Deseja mesmo deletar sua <Text style={styles.modalTextBold}>
                                                {modalPlant ? modalPlant.name : ''}
                                            </Text>?
                                        </Text>

                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonCancel]}
                                                onPress={() => setModalShown(false)}
                                            >
                                                <Text style={[styles.buttonText, styles.cancelText]}>
                                                    Cancelar
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.button, styles.buttonDelete]}
                                                onPress={async () => {
                                                    await handleRemove(modalPlant);
                                                    setModalShown(false);
                                                }}
                                            >
                                                <Text style={[styles.buttonText, styles.deleteText]}>
                                                    Deletar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <FlatList
                                data={myPlants}
                                keyExtractor={item => String(item.id)}
                                renderItem={({ item }) => (
                                    <PlantCardSecondary data={item} handleModal={() => handleModal(item)} />
                                )}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>

                    </View>
                    :
                    <Text style={styles.emptyStorage}>
                        Você não possui{'\n'}
                        nenhuma planta salva!
                    </Text>
            }
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: colors.white
    },
    wrapper: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
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
    emptyStorage: {
        color: colors.body_dark,
        fontFamily: fonts.heading,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0, .75)',
    },
    modalView: {
        backgroundColor: "white",
        width: '70%',
        paddingVertical: 20,
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalSVG: {
        backgroundColor: "#F3F7F5",
        borderRadius: 15,
        padding: 25,
        marginBottom: 20
    },
    modalWrapper: {
        paddingHorizontal: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        marginTop: 30
    },
    button: {
        borderRadius: 10,
        height: 50,
        width: '40%',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonCancel: {
        backgroundColor: "#F3F7F5"
    },
    buttonDelete: {
        backgroundColor: "#F7F4F4"
    },
    buttonText: {
        fontFamily: fonts.text,
        fontSize: 17,
    },
    cancelText: {
        textAlign: "center",
        color: colors.green_dark
    },
    deleteText: {
        textAlign: "center",
        color: colors.red
    },
    modalText: {
        fontSize: 17,
        paddingHorizontal: 20,
        textAlign: "center",
        fontFamily: fonts.text,
        color: colors.heading
    },
    modalTextBold: {
        fontFamily: fonts.heading,
        color: colors.heading
    }
});
