import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function Confirmation() {

	const navigation = useNavigation<any>();

	function navegar(){
		navigation.reset({
			routes: [
			  { name: 'PlantSelect' },
			],
		  })
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.emoji}>
					😄
				</Text>
				<Text style={styles.title}>
					Prontinho!
				</Text>
				<Text style={styles.subtitle}>
					Agora vamos começar a cuidar das suas plantinhas com muito cuidado
				</Text>
				<View style={styles.footer}>
					<Button title="Confirmar" onPress={navegar} />
				</View>
			</View>
		</SafeAreaView>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around",

	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: '100%',
		paddingHorizontal: 30,
	},
	emoji: {
		fontSize: 78
	},
	title: {
		fontSize: 22,
		fontFamily: fonts.heading,
		textAlign: "center",
		color: colors.heading,
		lineHeight: 38,
		marginTop: 15
	},
	subtitle: {
		fontSize: 17,
		fontFamily: fonts.text,
		textAlign: "center",
		color: colors.heading,
		paddingVertical: 10,
	},
	footer: {
		width: '100%',
		paddingHorizontal: 50,
		marginTop: 20
	},
})
