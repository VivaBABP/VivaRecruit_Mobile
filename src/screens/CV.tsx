import {ImageBackground, PermissionsAndroid, Platform, StyleSheet, View} from 'react-native'
import {Text, Button, TextInput} from 'react-native-paper'
import React, {useEffect, useState} from 'react'
import {Controller, useForm} from "react-hook-form";
import Animated, {FadeInUp, FadeInDown} from "react-native-reanimated";
import * as SQLite from 'expo-sqlite'
import * as DocumentPicker from 'expo-document-picker'
import {DocumentResult} from "expo-document-picker";

// @ts-ignore
export default function CV({navigation}) {
    const [singleFile, setSingleFile] = useState(null);


    async function pickDocument() {

        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true,
                multiple: false
            });
            await uploadFile(result)
        } catch (error) {
            console.log(error);
        }
    }

    const uploadFile = async (result: DocumentResult) => {
        try {
            if (result.type !== "cancel") {
                const formData = new FormData();
                formData.append('file', {
                    uri: result.uri,
                    type: result.type,
                    name: result.name,
                });
                console.log(formData);
            } else {
                console.log("Je vous ai bien niquez")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <Text>Upload du CV</Text>
            <Button onPress={pickDocument}>Upload</Button>
        </View>
    )
}