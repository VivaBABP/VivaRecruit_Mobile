import { Text, Button } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker'
import { DocumentResult } from "expo-document-picker";
import { View } from "react-native";
import CvService from '../services/CvService';
import { cacheDirectory, copyAsync, getInfoAsync, makeDirectoryAsync, uploadAsync } from 'expo-file-system'

// @ts-ignore
export default function CV() {

    const [Message, setMessage] = useState("")

    const cvService = new CvService;

    useEffect(() => {
      verifyPdf();
    }, [])
    

    const verifyPdf = (): void => {
        cvService.ifExist()
        .then((e) => {
            if (e) {
                setMessage("CV uploadé")
            }
            else {
                setMessage("Aucun CV uploadé")
            }
        })
        .catch((e) => {
            console.log(JSON.stringify(e))
        })
    }

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
                const res = await cvService.uploadCv(file);
                alert(res.body);
                verifyPdf();
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
        <View style={style.container}>
            <Text style={{ textAlign: 'center', fontFamily: '500', fontSize: 30 }}> {Message} </Text>
            <Button style={{margin: '30%', backgroundColor: '#EC4D0C'}} mode='contained' onPress={pickDocument}>Upload</Button>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})