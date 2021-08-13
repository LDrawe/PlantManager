import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AuthRoutes from './tab.routes';

import Welcome from '../pages/Welcome';
import UserIdentification from '../pages/UserIdentification';
import Confirmation from '../pages/Confirmation';
import PlantSave from '../pages/PlantSave';

import colors from '../styles/colors';

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
	<StackRoutes.Navigator
		initialRouteName="Welcome"
		screenOptions={{
			gestureEnabled: true,
			cardStyle: {
				backgroundColor: colors.background
			},
			headerShown: false
		}}
	>
		<StackRoutes.Screen name="Welcome" component={Welcome} />
		<StackRoutes.Screen name="UserIdentification" component={UserIdentification} />
		<StackRoutes.Screen name="Confirmation" component={Confirmation} />
		<StackRoutes.Screen name="PlantSelect" component={AuthRoutes} />
		<StackRoutes.Screen name="PlantSave" component={PlantSave} />
		<StackRoutes.Screen name="Home" component={AuthRoutes} />

	</StackRoutes.Navigator>
);

export default AppRoutes;