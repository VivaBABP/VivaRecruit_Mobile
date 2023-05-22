import {Text, Button} from 'react-native-paper'
import React from 'react'
import * as DocumentPicker from 'expo-document-picker'
import {DocumentResult} from "expo-document-picker";
import {View} from "react-native";

// @ts-ignore
export default function CV() {


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