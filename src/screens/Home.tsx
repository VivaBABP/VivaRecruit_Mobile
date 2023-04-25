import {View, Text, Button} from 'react-native'
import React from 'react'

// @ts-ignore
export default function Home({navigation}) {
    return (
        <View>
            <Text>Bonjour Hugo</Text>
            <Button title="Déconnecter" onPress={() => navigation.popToTop()}/>
        </View>
    )
}