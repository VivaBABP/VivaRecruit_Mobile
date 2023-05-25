import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import JobList from '../../screens/JobList';
import CV from '../../screens/CV';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import CandidateInfo from '../../screens/CandidateInfo';
import Interests from '../../screens/Interests';

const Tab = createBottomTabNavigator();

export function TabNavigatorNotRecruit() {

    const {disconnect} = useContext(AuthContext);

    const logOut = async () => {
        await disconnect()
    };

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
                },
                headerBackground: () => (
                    <LinearGradient
                        colors={['#6750A4', '#B80F7F', '#EC4D0C',]}
                        style={{ flex: 1 }}
                    />
                ),
                headerTintColor: '#fff',
                headerRight: () => (
                    <TouchableOpacity onPress={logOut}>
                        <Ionicons style={{ marginRight: 15 }} name="exit-outline" color={'white'} size={40} />
                    </TouchableOpacity>
                ),
                headerLeft: () => (
                    <Image
                    source={require('../../../assets/logo/logo_vivatech_icon.png')}
                    style={{ width: 45, height: 45, marginLeft: 10 }}
                    />
                )
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
                name='Contact'
                component={CandidateInfo}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="document-text" color={color} size={size} />)
                }}
            />
            <Tab.Screen
                name='Fiches de poste'
                component={JobList}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="file-tray-full" color={color} size={size} />)
                }}
            />
            <Tab.Screen
                name='Uploadez votre CV'
                component={CV}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="reader" color={color} size={size} />)
                }}
            />
            <Tab.Screen
                name='Interets'
                component={Interests}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="reader" color={color} size={size} />)
                }}
            />
        </Tab.Navigator>
    )
}