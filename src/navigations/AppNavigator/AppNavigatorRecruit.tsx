import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigatorRecruit from '../TabNavigator/TabNavigatorRecruit';

const Stack = createNativeStackNavigator();

export default function AppNavigatorRecruit() {
  return (
    <Stack.Navigator initialRouteName='Tab' >
      <Stack.Screen name='Tab' component={TabNavigatorRecruit} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}