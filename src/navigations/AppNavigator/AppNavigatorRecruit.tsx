import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigatorRecruit from '../TabNavigator/TabNavigatorRecruit';
import ViewPdf from '../../components/ViewPdf';

const Stack = createNativeStackNavigator();

export default function AppNavigatorRecruit() {
    return (
        <Stack.Navigator initialRouteName='Tab' >
            <Stack.Screen name='Tab' component={TabNavigatorRecruit} options={{ headerShown: false }} />
            <Stack.Screen name='ViewPdf' component={ViewPdf} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}