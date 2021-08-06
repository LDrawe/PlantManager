import React, { useState } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {

	const navigation = useNavigation<any>();

	const [isFocused, setIsFocused] = useState(false);
	const [name, setName] = useState<string>("");

	function handleInputBlur() {
		setIsFocused(false);
	}

	function handleInputFocus() {
		setIsFocused(true);
	}

	function handleConfirm() {
		navigation.navigate("Confirmation")
	}

	return (
		<SafeAreaView style={styles.container}>
			<TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"}>
					<View style={styles.content}>
						<View style={styles.form}>
							<View style={styles.header}>
								<Text style={styles.emoji}>
									{name ? "😄" : "😃"}
								</Text>
								<Text style={styles.title}>
									Como podemos {"\n"}
									chamar você ?
								</Text>
							</View>
							<TextInput
								style={[
									styles.input,
									(isFocused || name != "") && { borderColor: colors.green }
								]}
								placeholder="Digite um nome"
								onBlur={handleInputBlur}
								onFocus={handleInputFocus}
								onChangeText={name => setName(name)}
							/>
							<View style={styles.footer}>
								<Button title="Confirmar" disabled={!name} onPress={handleConfirm} />
							</View>
						</View>
					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignItems: "center",
		justifyContent: "space-around",
	},
	content: {
		flex: 1,
		width: '100%'
	},
	form: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 54
	},
	header: {
		alignItems: "center"
	},
	emoji: {
		fontSize: 44
	},
	input: {
		borderBottomWidth: 1,
		borderColor: colors.gray,
		color: colors.heading,
		width: '100%',
		fontSize: 18,
		marginTop: 50,
		padding: 10,
		textAlign: "center"
	},
	title: {
		fontSize: 24,
		lineHeight: 32,
		textAlign: "center",
		color: colors.heading,
		fontFamily: fonts.heading,
		marginTop: 20
	},
	footer: {
		width: '100%',
		marginTop: 40,
		paddingHorizontal: 20
	},
})
