import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import QrCode from '../../screens/QrCode';
import CompanyForm from '../../screens/CompanyForm';
import Job_Form from '../../screens/JobForm';
import { AuthContext } from '../../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, Image } from 'react-native';
import SearchStudents from '../../screens/SearchStudents';

const Tab = createBottomTabNavigator();

export default function TabNavigatorRecruit() {

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
                name='Etudiant'
                component={SearchStudents}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="person-outline" color={color} size={size} />)
                }}
            />
            <Tab.Screen
                name='Formulaire de fiche de poste'
                component={Job_Form}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="file-tray-full" color={color} size={size} />)
                }}
            />
            <Tab.Screen
                name='Scannez les informations de contact'
                component={QrCode}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="qr-code-outline" color={color} size={size} />)
                }}
            />
            <Tab.Screen
                name="Formulaire d'entreprise"
                component={CompanyForm}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="business-outline" color={color} size={size} />)
                }}
            />
        </Tab.Navigator>
    )
}
