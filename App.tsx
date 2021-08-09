import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {
	useFonts,
	Jost_400Regular,
	Jost_600SemiBold
} from "@expo-google-fonts/jost";
import AppLoading from 'expo-app-loading';
import Routes from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
