import React, { useEffect } from 'react';
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	View
} from 'react-native';
import Watering from '../assets/watering.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function Welcome() {

	const navigation = useNavigation();

	function handleStart() {
		navigation.navigate("UserIdentification");
	}

	useEffect(() => {
		async function checkForUser() {
			try {
				const user = await AsyncStorage.getItem('@plantmanager:user');
				if (user) {
					navigation.navigate('Home');
				}
			} catch (error) {
				await AsyncStorage.multiRemove(['@plantmanager:user','@plantmanager:plants']);
			}
		}
		checkForUser();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>
					Gerencie {"\n"}
					suas plantas de {"\n"}
					forma fácil
				</Text>

				<Image source={Watering} style={styles.image} resizeMode="contain" />

				<Text style={styles.subtitle}>
					Não esqueça de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar
				</Text>

				<Button title=">" onPress={handleStart} />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	wrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around",
		paddingHorizontal: 20
	},
	title: {
		fontSize: 28,
		textAlign: "center",
		color: colors.heading,
		marginTop: 38,
		fontFamily: fonts.heading,
		lineHeight: 34
	},
	subtitle: {
		textAlign: "center",
		fontSize: 18,
		paddingHorizontal: 20,
		color: colors.heading
	},
	image: {
		height: Dimensions.get("window").width * 0.7,
	}
});
