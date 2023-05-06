import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Button} from 'react-native-paper'
import {createTableInfoUser, insertInfoUser} from "../services/Database";
import {getIconColor} from "react-native-paper/lib/typescript/src/components/TextInput/Adornment/utils";

export default function QrCode({}) {
    const [hasPermission, setHasPermission] = useState('');
    const [scanned, setScanned] = useState(false);
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted' ? 'granted':'false');
        };
        createTableInfoUser();
        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ( donnee :{type: string, data: string}) => {
        setScanned(true);
        console.log(donnee);
        try {
            const dataToSave = JSON.parse(donnee.data);
            const user: {mail: string, nom: string,prenom: string, phoneNumber: string, lastDiploma: string } = {mail : dataToSave['mail'], nom: dataToSave['nom'], prenom: dataToSave['prenom'], phoneNumber : dataToSave['phoneNumber'], lastDiploma: dataToSave['lastDiploma']}
            insertInfoUser(user).then((res) => {
                alert('Le user à été enregistré');
            }).catch((error) => {
                alert(error);
            })
        }catch (e){
            alert("Mauvais qr code donné");
        }

    };

    if (hasPermission === null) {
        return <Text>Demande d'accès à la caméra en cours</Text>;
    }
    if (hasPermission === 'false') {
        return <Text>Pas d'accès à la camera</Text>;
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        qrCode: {
            width : '100%',
        }
    })


    return (
        <View style={styles.container}>
            {!scanned && <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />}
            {scanned && <Button onPress={() => setScanned(false)}>Tap to Scan Again</Button>}
        </View>
    );


}