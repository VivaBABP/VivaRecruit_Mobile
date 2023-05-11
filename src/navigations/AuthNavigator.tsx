import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn";
import React from "react";
import SignUp from "../screens/SignUp";
import ActivationCode from "../screens/ActivationCode";

const Stack = createNativeStackNavigator();

export function AuthNavigator() {

    return (
        <Stack.Navigator initialRouteName='SignIn'>
            <Stack.Screen name='SignIn' component={SignIn}/>
            <Stack.Screen name='SignUp' component={SignUp}/>
            <Stack.Screen name='ActivationCode' component={ActivationCode}/>
        </Stack.Navigator>
    )
}