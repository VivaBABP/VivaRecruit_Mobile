import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator, { TabNavigatorNotRecruit } from './TabNavigator';
import SignIn from "../screens/SignIn";
import Home from "../screens/Home";
import SignUp from "../screens/SignUp"
import CV from "../screens/CV";
import ActivationCode from '../screens/ActivationCode';
import TabNavigatorRecruit from "./TabNavigator";
import ViewPdf from '../components/ViewPdf';

const Stack = createNativeStackNavigator();

export default function AppNavigatorRecruit() {
    return (
        <Stack.Navigator initialRouteName='Tab' >
            <Stack.Screen name='Tab' component={TabNavigatorRecruit} options={{ headerShown: false }} />
            <Stack.Screen name='ViewPdf' component={ViewPdf} />
        </Stack.Navigator>
    )
}

export function AppNavigatorNotRecruit() {
    return (
        <Stack.Navigator initialRouteName='Tab' >
            <Stack.Screen name='Tab' component={TabNavigatorNotRecruit} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}