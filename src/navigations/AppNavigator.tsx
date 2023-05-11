import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import SignIn from "../screens/SignIn";
import Home from "../screens/Home";
import SignUp from "../screens/SignUp"
import CV from "../screens/CV";
import ActivationCode from '../screens/ActivationCode';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
            <Stack.Navigator initialRouteName='Tab' >
                <Stack.Screen name='Tab' component={TabNavigator} options={{headerShown: false}}/>
            </Stack.Navigator>
    )
}