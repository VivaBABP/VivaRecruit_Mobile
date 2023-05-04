import {useEffect, useState} from "react";
import {createTableInfoUser, getInfoUsers} from "../services/Database";
import {View, StyleSheet} from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import {Text} from "react-native-paper";

export default function GenerateQrCode() {
    const [valueQrCode, setValueQrCode] = useState('test');
    const [userExist, setUserExist] = useState(false);

    useEffect(() => {
        createTableInfoUser();

        getInfoUsers().then((res) => {
            if(res.rows.length > 0){
                setUserExist(true);
                setValueQrCode(JSON.stringify(res.rows.item(0)));
            }

        })
    })

    const styles = StyleSheet.create({
        container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
        }
    })

    return (
        <View style={styles.container}>
           <View>
               {userExist ? <QRCode value={valueQrCode} size={300}/> : <Text>Aucune informations stockée pour le qr code</Text>}
           </View>
        </View>
    )
}