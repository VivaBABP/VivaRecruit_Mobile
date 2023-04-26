import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Contact_Form from '../screens/ContactForm';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Contact Form' component={Contact_Form} />
    </Tab.Navigator>
  )
}
