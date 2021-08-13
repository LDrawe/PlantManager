import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import EnvironmentButton from '../components/EnvironmentButton';
import PlantCardPrimary from '../components/PlantCardPrimary';
import Load from '../components/Load';
import { PlantProps } from '../libs/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import axios from 'axios';
import api from '../services/api';
import { useNavigation } from '@react-navigation/core';
interface EnvironmentProps {
	key: string,
	title: string
}

export default function PlantSelect() {

	const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
	const [plants, setPlants] = useState<PlantProps[]>([]);
	const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
	const [environmentSelected, setEnvironmentSelected] = useState("all");

	const [initialPlantFetch, setInitialPlantFetch] = useState(true);

	const [page, setPage] = useState(1);
	const [loadingMore, setLoadingMore] = useState(false);
	const [loadedAll, setLoadedAll] = useState(false);

	const navigation = useNavigation<any>();

	const source = axios.CancelToken.source();

	async function fetchPlants() {
		try {
			const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

			if (!data) {
				setLoadedAll(true);
			}

			if (page > 1) {
				setPlants(oldValue => [...oldValue, data]);
				setFilteredPlants(oldValue => [...oldValue, data]);
			}
			else {
				setPlants(data);
				setFilteredPlants(data);
			}
			setInitialPlantFetch(false);
			setLoadingMore(false);
		} catch (error) {
			console.log(error);
		}
	}

	function handleEnvironmentSelected(environment: string) {
		setEnvironmentSelected(environment);

		if (environment == 'all')
			return setFilteredPlants(plants);

		const filtered = plants.filter(plant => plant.environments.includes(environment));

		setFilteredPlants(filtered);
	}

	function handleFetchMore(distance: number) {
		if (distance < 1 || loadedAll) {
			return;
		}
		setLoadingMore(true);
		setPage(oldValue => oldValue++);
		fetchPlants();
	}

	function handlePlantSelect(plant: PlantProps) {
		navigation.navigate('PlantSave', { plant })
	}

	useEffect(() => {
		async function fetchEnviroment() {
			const { data } = await api.get("plants_environments?_sort=title&_order=asc");
			setEnvironments([
				{
					key: 'all',
					title: 'Todos',
				},
				...data
			]);
		}
		fetchEnviroment();
		return () => {
			source.cancel();
		}
	}, []);

	useEffect(() => {
		fetchPlants();
		return () => {
			source.cancel();
		}
	}, []);

	if (initialPlantFetch)
		return <Load />

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<Header />
				<Text style={styles.title}>
					Em qual ambiente
				</Text>
				<Text style={styles.subtitle}>
					você quer colocar sua planta?
				</Text>
				<View>
					<FlatList
						data={environments}
						keyExtractor={Environment => Environment.key}
						renderItem={({ item: Environment }) => (
							<EnvironmentButton
								title={Environment.title}
								active={Environment.key == environmentSelected}
								onPress={() => handleEnvironmentSelected(Environment.key)}
							/>
						)}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.enviromentList}
					/>
				</View>
				<View style={styles.container}>
					<FlatList
						data={filteredPlants}
						keyExtractor={plant => String(plant.id)}
						renderItem={({ item: plant }) => (
							<PlantCardPrimary data={plant} onPress={() => handlePlantSelect(plant)} />
						)}
						showsVerticalScrollIndicator={false}
						numColumns={2}
						columnWrapperStyle={{ justifyContent: 'space-between' }}
						onEndReachedThreshold={0.1}
						onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
						ListFooterComponent={
							loadingMore ? <ActivityIndicator color={colors.green} size={32} /> : null
						}
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},
	wrapper: {
		paddingHorizontal: 20,
		flex: 1
	},
	title: {
		fontSize: 17,
		color: colors.heading,
		fontFamily: fonts.heading,
		lineHeight: 20,
		marginTop: 15
	},
	subtitle: {
		fontSize: 17,
		color: colors.heading,
		fontFamily: fonts.text,
		lineHeight: 20,
	},
	enviromentList: {
		height: 40,
		justifyContent: 'center',
		paddingBottom: 5,
		marginVertical: 32
	}
});
