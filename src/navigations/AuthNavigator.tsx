import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn";
import React from "react";
import SignUp from "../screens/SignUp";
import ActivationCode from "../screens/ActivationCode";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

export function AuthNavigator() {

    return (
        <Stack.Navigator initialRouteName='SignIn' screenOptions={{
            headerBackground: () => (
                <LinearGradient
                    colors={['#6750A4', '#B80F7F', '#EC4D0C',]}
                    style={{ flex: 1 }}
                />
            ),
            headerTintColor: '#fff'
        }}>
            <Stack.Screen name='SignIn' component={SignIn} options={{
                title: 'Se connecter'
            }}
            />
            <Stack.Screen name='SignUp' component={SignUp} options={{
                title: "S'inscrire"
            }} />
            <Stack.Screen name='ActivationCode' component={ActivationCode} options={{
                title: 'Validation du compte'
            }}/>
        </Stack.Navigator>
    )
}