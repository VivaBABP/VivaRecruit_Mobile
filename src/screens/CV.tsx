import { Text, Button } from 'react-native-paper'
import React from 'react'
import * as DocumentPicker from 'expo-document-picker'
import { DocumentResult } from "expo-document-picker";
import { View } from "react-native";
import CvService from '../services/CvService';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { cacheDirectory, copyAsync, getInfoAsync, makeDirectoryAsync, uploadAsync } from 'expo-file-system'

// @ts-ignore
export default function CV() {

    const cvService = new CvService;

    async function pickDocument() {

        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: false,
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
                const file = await createCacheFile(result.uri, result.name);                
                await cvService.uploadCv(file);
            } else {
                console.log("Cancel")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const createCacheFile = async (uri: string, name: string) => {
        if (!(await getInfoAsync(cacheDirectory + "uploads/")).exists) {
            await makeDirectoryAsync(cacheDirectory + "uploads/");
        }
        const cacheFilePath = cacheDirectory + "uploads/" + name;
        await copyAsync({ from: uri, to: cacheFilePath });
        return cacheFilePath;
    }

    return (
        <View>
            <Text>Upload du CV</Text>
            <Button onPress={pickDocument}>Upload</Button>
        </View>
    )
}