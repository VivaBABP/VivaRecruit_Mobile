import React from "react";
import {useState} from "react";
import {View, StyleSheet} from "react-native";
import {Button} from "react-native-paper";
import QrCode from "./QrCode";
import GenerateQrCode from "./GenerateQrCode";

export default function PageQrCode() {
    const [scan, setScan] = useState(true);

    return(
        <View style={StyleSheet.absoluteFillObject}>
            <Button mode='contained' onPress={() =>{setScan(true); console.log(scan)}}>Page scan qr code</Button>
            <Button mode='contained' onPress={() => {setScan(false); console.log(scan)}}>Page de génération de qr code</Button>
            { scan ? <QrCode></QrCode> : <GenerateQrCode></GenerateQrCode>}
        </View>
    )
}