import { ImageBackground, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper'
import React, { useContext, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import Animated, { FadeInUp, FadeInDown, Value } from "react-native-reanimated";
import { CredentialDTO } from "../client/recruitBack";
import { AuthService } from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import { blue100 } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import { MultipleSelectList } from 'react-native-dropdown-select-list'

// @ts-ignore
export default function Interests({ navigation }) {




    const data = [
        {  value: 'Ecologie' },
        {  value: 'Economique' },
        {  value: 'Communication' },
        {  value: 'Sport' },
        {  value: 'Rencontre' },
    ]
    const [selected, setSelected] = React.useState("");

    const styles = StyleSheet.create({
        container: {
            flex: 2,
            flexDirection: 'column',
            gap: 40,
            alignItems: 'center',
            margin: 40
        },
        input: {},
        connection: {
            width: '70%'
        },
        image: {
            flex: 1,
            justifyContent: 'center'
        },
        rounded: {
            width: '70%',
            borderRadius: 25,
            overflow: 'hidden',
            borderStyle: 'solid',
            borderColor: '#0000',
        },



    })

    return (
        <ImageBackground style={styles.image} source={require('./../../assets/images/background-gradient-phone.png')}
            resizeMode='cover'>
            <View style={{paddingHorizontal:20,paddingVertical:50,flex:1}}>
                <MultipleSelectList
                    setSelected={(val: React.SetStateAction<string>) => setSelected(val)}
                    data={data}
                    search ={false} 
                    save="value"
                    label="intérêts"
                    placeholder='sélectionner vos intérêts'
                    boxStyles={{ backgroundColor: 'blueviolet', borderColor: 'black'}}
                    inputStyles={{color:'white'}}
                    dropdownStyles={{ backgroundColor: 'blueviolet', borderColor: 'black' }}
                    dropdownTextStyles={{ color: 'white' }}
                />

            </View>
        </ImageBackground>
    )
}


