import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp"
import ActivationCode from '../screens/ActivationCode';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SignIn'>
                <Stack.Screen name='SignIn' component={SignIn} />
                <Stack.Screen name='Tab' component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name='SignUp' component={SignUp} />
                <Stack.Screen name='ActivationCode' component={ActivationCode} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}