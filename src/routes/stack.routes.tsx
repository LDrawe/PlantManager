import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import colors from '../styles/colors';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import Confirmation from '../pages/Confirmation';

type StackParamList = {
	Welcome: undefined,
	UserIdentification: undefined,
	Confirmation: undefined,
}

const StackRoutes = createStackNavigator<StackParamList>();

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

	</StackRoutes.Navigator>
);

export default AppRoutes;