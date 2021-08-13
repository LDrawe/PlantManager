import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/routes';
import {
	useFonts,
	Jost_400Regular,
	Jost_600SemiBold
} from "@expo-google-fonts/jost";

export default function App() {
	const [fontsLoaded] = useFonts({
		Jost_400Regular,
		Jost_600SemiBold
	});

	if (!fontsLoaded)
		return <AppLoading />

	return (
		<SafeAreaProvider>
			<Routes />
			<StatusBar style="auto" />
		</SafeAreaProvider>
	);
}
