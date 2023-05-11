import { View, Text, Button } from 'react-native'
import React, {useContext} from 'react'
import {AuthContext} from "../context/AuthContext";

// @ts-ignore
export default function Home({ navigation }) {

    const { disconnect } = useContext(AuthContext);

    return (
        <View>
            <Text>Bonjour Hugo</Text>
            <Button title="Déconnecter" onPress={disconnect} />
        </View>
    )
}