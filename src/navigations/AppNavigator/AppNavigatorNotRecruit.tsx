import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigatorNotRecruit } from '../TabNavigator/TabNavigatorNotRecruit';

const Stack = createNativeStackNavigator();

export function AppNavigatorNotRecruit() {
    return (
        <Stack.Navigator initialRouteName='Tab' screenOptions={{}}>
            <Stack.Screen name='Tab' component={TabNavigatorNotRecruit} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}