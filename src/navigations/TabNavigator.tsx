import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Contact_Form from '../screens/ContactForm';
import Job_Form from '../screens/JobForm';
import CV from "../screens/CV";
import PageQrCode from "../screens/PageQrCode";
import JobList from '../screens/JobList';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
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
                component={Contact_Form}
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
                name='Job Form'
                component={Job_Form}
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
            <Tab.Screen
                name='QrCode'
                component={PageQrCode}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="qr-code-outline" color={color} size={size} />)
                }}
            />
        </Tab.Navigator>
    )
}
