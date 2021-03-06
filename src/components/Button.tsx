import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
	title: string
}

export default function Button({ title, ...rest }: ButtonProps) {
	return (
		<TouchableOpacity
			style={styles.button}
			activeOpacity={0.7}
			{...rest}
		>
			<Text style={styles.buttonText}>
				{title}
			</Text>

		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.green,
		justifyContent: "center",
		borderRadius: 16,
		marginBottom: 10,
		height: 56,
		paddingHorizontal: 20
	},
	buttonText: {
		color: colors.white,
		fontSize: 24,
		textAlign: 'center',
		fontFamily: fonts.heading
	}
});
