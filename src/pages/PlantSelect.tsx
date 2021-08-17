import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import EnviromentButton from "../components/EnvironmentButton";
import Header from "../components/Header";
import PlantCardPrimary from "../components/PlantCardPrimary";
import Load from "../components/Load";

import { PlantProps } from "../libs/storage";

import api from "../services/api";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

interface EnvironmentsProps {
	key: string;
	title: string;
}

export default function PlantSelect() {
	const [environments, setEnvironments] = useState<EnvironmentsProps[]>([]);
	const [plants, setPlants] = useState<PlantProps[]>([]);
	const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
	const [environmentSelected, setEnvironmentSelected] = useState<string>('all');
	const [loading, setLoading] = useState<boolean>(true);

	const [page, setPage] = useState<number>(1);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);

	const [loadedAll, setLoadedAll] = useState<boolean>(false);

	const navigation = useNavigation();

	function handleEnvironmentSelected(environment: string) {
		setEnvironmentSelected(environment);

		if (environment == 'all')
			return setFilteredPlants(plants);

		const filtered = plants.filter(plant =>
			plant.environments.includes(environment)
		);

		setFilteredPlants(filtered);
	}

	async function fecthPlants() {
		const { data } = await api.get(`plants?_sort=name&order=asc&_page=${page}&_limit=6`);		

		if (data.length == 0) {
			setLoadedAll(true);
			return;
		}

		if (page > 1) {
			setPlants(oldValue => [...oldValue, ...data])
			setFilteredPlants(oldValue => [...oldValue, ...data])
		} else {
			setPlants(data);
			setFilteredPlants(data);
		}

		setLoading(false);
		setLoadingMore(false);
	}

	function handleFetchMore(distance: Number) {
		if (loadedAll || loadingMore || distance < 1){
			return;
		}
			

		setLoadingMore(true);
		setPage(oldValue => oldValue + 1);
		fecthPlants();
	}

	function handlePlantSelect(plant: PlantProps) {
		navigation.navigate('PlantSave', { plant });
	}

	useEffect(() => {
		async function fecthEnvironment() {
			const { data } = await api.get('plants_environments?_sort=title&order=asc');
			setEnvironments([
				{
					key: 'all',
					title: 'Todos',
				},
				...data
			]);
		}

		fecthEnvironment();
	}, [])

	useEffect(() => {
		fecthPlants();
	}, [])

	if (loading)
		return <Load />

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Header />

				<Text style={styles.title}>
					Em qual ambiente
				</Text>
				<Text style={styles.subtitle}>
					você quer colocar sua planta?
				</Text>
			</View>

			<View>
				<FlatList
					data={environments}
					keyExtractor={(item) => String(item.key)}
					renderItem={({ item }) =>
						<EnviromentButton
							title={item.title}
							active={item.key == environmentSelected}
							onPress={() => handleEnvironmentSelected(item.key)}
						/>
					}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.enviromentList}
				/>
			</View>

			<View style={styles.plants}>
				<FlatList
					data={filteredPlants}
					keyExtractor={plant => String(plant.id)}
					renderItem={({ item: plant }) => (
						<PlantCardPrimary data={plant} onPress={() => handlePlantSelect(plant)} />
					)}
					showsVerticalScrollIndicator={false}
					numColumns={2}
					columnWrapperStyle={styles.columns}
					onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
					onEndReachedThreshold={0.1}
					ListFooterComponent={
						loadingMore ? <ActivityIndicator color={colors.green} size="large" /> : <></>
					} />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 20
	},
	container: {
		flex: 1,
		backgroundColor: colors.white
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
		fontFamily: fonts.text,
		lineHeight: 20,
		color: colors.heading
	},
	enviromentList: {
		width: '100%',
		justifyContent: 'space-evenly',
		marginVertical: '5%'
	},
	plants: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: 'center'
	},
	columns:{
		justifyContent: 'space-between'
	}
});