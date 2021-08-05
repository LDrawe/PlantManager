import React, { useState } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import Watering from '../assets/watering.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import colors from '../styles/colors';

export function Welcome() {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<SafeAreaView style={styles.container}>

			<Text style={styles.title}>
				Gerencie {"\n"}
				suas plantas {"\n"}
				de forma fácil
			</Text>

			{isVisible ? <Image source={Watering} style={styles.image} /> : null}

			<Text style={styles.subtitle}>
				Não esqueça de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar
			</Text>

			<Button Title="Imagem" onPress={() => setIsVisible(!isVisible)} />
			<Button Title=">" />

		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		textAlign: "center",
		color: colors.heading,
		marginTop: 38
	},
	subtitle: {
		textAlign: "center",
		fontSize: 18,
		paddingHorizontal: 20,
		color: colors.heading
	},
	image: {
		width: 292,
		height: 284,
	}
});
