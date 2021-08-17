import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps, Swipeable } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import Feather from '@expo/vector-icons/Feather';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
    data: {
        name: string,
        photo: string,
        hour: string
    }
    handleModal: () => void;
}

export default function PlantCardSecondary({ data, handleModal, ...rest }: PlantProps) {

    return (
        <Swipeable
            overshootRight={false}
            overshootFriction={8}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleModal}
                        >
                            <Feather name="trash" color={colors.white} size={32} />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton style={styles.container} {...rest}>
                <SvgFromUri
                    uri={data.photo}
                    width={50}
                    height={50}
                />
                <Text style={styles.title}>
                    {data.name}
                </Text>
                <View style={styles.details}>
                    <Text style={styles.timeLabel}>
                        Regas às
                    </Text>
                    <Text style={styles.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        borderRadius: 20,
        height: 110,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    title: {
        flex: 1,
        fontFamily: fonts.heading,
        fontSize: 17,
        marginLeft: 10,
        color: colors.heading
    },
    details: {
        alignItems: 'flex-end'
    },
    timeLabel: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    },
    buttonRemove: {
        width: 120,
        height: 110,
        backgroundColor: colors.red,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 25,
        marginLeft: -35
    }
});
