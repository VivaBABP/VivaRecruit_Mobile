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
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SignIn'>
                <Stack.Screen name='SignIn' component={SignIn} options={{headerShown: true}}/>
                <Stack.Screen name='Tab' component={TabNavigator} options={{headerShown: false}}/>
                <Stack.Screen name='SignUp' component={SignUp} options={{headerShown: true}}/>
                <Stack.Screen name='ActivationCode' component={ActivationCode} options={{headerShown: true}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}