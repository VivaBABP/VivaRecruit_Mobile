import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn";
import React from "react";
import SignUp from "../screens/SignUp";
import ActivationCode from "../screens/ActivationCode";

const Stack = createNativeStackNavigator();

export function AuthNavigator() {

    return (
        <Stack.Navigator initialRouteName='SignIn'>
            <Stack.Screen name='SignIn' component={SignIn} options={{ title: 'Se connecter'
            }}/>
            <Stack.Screen name='SignUp' component={SignUp} options={{ title: "S'inscrire"
            }}/>
            <Stack.Screen name='ActivationCode' component={ActivationCode}options={{ title: 'Validation du Compte'
            }}/>
        </Stack.Navigator>
    )
}