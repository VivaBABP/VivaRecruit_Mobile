import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import PageQrCode from '../../screens/PageQrCode';
import CompanyForm from '../../screens/CompanyForm';
import Job_Form from '../../screens/JobForm';

const Tab = createBottomTabNavigator();

export default function TabNavigatorRecruit() {
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
                name='Stands'
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="home" color={color} size={size} />)
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
                name='QrCode'
                component={PageQrCode}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="qr-code-outline" color={color} size={size} />)
                }}
            />
            <Tab.Screen
                name='Company form'
                component={CompanyForm}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="business-outline" color={color} size={size} />)
                }}
            />
        </Tab.Navigator>
    )
}
