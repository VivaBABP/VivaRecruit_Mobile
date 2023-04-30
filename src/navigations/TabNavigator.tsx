import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import RefreshTest from '../screens/RefreshTest';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='RefreshTest' component={RefreshTest} />
        </Tab.Navigator>
    )
}
