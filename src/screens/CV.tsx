import { Text, Button } from 'react-native-paper'
import React from 'react'
import * as DocumentPicker from 'expo-document-picker'
import { DocumentResult } from "expo-document-picker";
import { View } from "react-native";
import CvService from '../services/CvService';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import * as ExpoFileSystem from 'expo-file-system'

// @ts-ignore
export default function CV() {

    const cvService = new CvService;

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
                await cvService.uploadCv(result.uri);
            } else {
                console.log("Cancel")
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