import { View, Text, Button } from 'react-native'
import React, {useContext, useEffect} from 'react'
import {AuthContext} from "../context/AuthContext";
import * as SecureStore from 'expo-secure-store';
import * as jwtDecode from "jwt-decode";

export default function Home() {

    const { disconnect } = useContext(AuthContext);

    const logOut = async () => {await disconnect()};
    return (
        <View>
            <Text>Bonjour Hugo</Text>
            <Button title="Déconnecter" onPress={logOut} />
        </View>
    )
}