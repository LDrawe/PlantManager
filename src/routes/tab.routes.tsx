import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlantSelect from '../pages/PlantSelect';
import MyPlants from '../pages/MyPlants';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '../styles/colors';

const Tabs = createBottomTabNavigator();

const AuthRoutes = () => {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                inactiveTintColor: colors.heading,
                labelPosition: 'beside-icon',
                style: {
                    height: Platform.select({ios: 88, android: 70}),
                    paddingVertical: Platform.select({ios: 20, android: 0})
                }
            }}
        >
            <Tabs.Screen
                name="NewPlant"
                component={PlantSelect}
                options={{
                    tabBarLabel: "Nova Planta",
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name="add-circle-outline"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />

            <Tabs.Screen
                name="MyPlants"
                component={MyPlants}
                options={{
                    tabBarLabel: "Minhas Plantas",
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />

        </Tabs.Navigator>
    );
}

export default AuthRoutes;