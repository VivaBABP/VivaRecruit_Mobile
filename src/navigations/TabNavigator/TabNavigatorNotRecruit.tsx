import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import JobList from '../../screens/JobList';
import CV from '../../screens/CV';
import ContactForm from '../../screens/ContactForm';

const Tab = createBottomTabNavigator();

export function TabNavigatorNotRecruit() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    right: 20,
                    left: 20,
                    borderRadius: 20,
                }
            }}
            sceneContainerStyle={{
                marginBottom: 70
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="home" color={color} size={size} />)
                }}
            />
            <Tab.Screen
                name='Contact Form'
                component={ContactForm}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="document-text" color={color} size={size} />)
                }}
            />
            <Tab.Screen
                name='Job List'
                component={JobList}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="file-tray-full" color={color} size={size} />)
                }}
            />
            <Tab.Screen
                name='Cv'
                component={CV}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="reader" color={color} size={size} />)
                }} />
        </Tab.Navigator>
    )
}