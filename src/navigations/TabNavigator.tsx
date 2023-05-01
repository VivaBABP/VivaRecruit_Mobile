import {View, Text} from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import CV from "../screens/CV";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='Cv' component={CV}/>
        </Tab.Navigator>
    )
}
