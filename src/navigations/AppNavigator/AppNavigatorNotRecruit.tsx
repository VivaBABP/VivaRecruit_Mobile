import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigatorNotRecruit } from '../TabNavigator';

const Stack = createNativeStackNavigator();

export function AppNavigatorNotRecruit() {
    return (
        <Stack.Navigator initialRouteName='Tab' >
            <Stack.Screen name='Tab' component={TabNavigatorNotRecruit} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}