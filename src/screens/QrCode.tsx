import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Button, TextInput} from 'react-native-paper'
import {createTableInfoUser, insertInfoUser} from "../services/Database";
import {Controller, useForm} from "react-hook-form";

export default function QrCode({}) {
    const [hasPermission, setHasPermission] = useState('');
    const [scanned, setScanned] = useState(false);
    const [read, setRead] = useState(false);
    useEffect(() => {

        const getBarCodeScannerPermissions = async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        createTableInfoUser();
        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center'
        }
    })


    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button onPress={() => setScanned(false)}>Tap to Scan Again</Button>}
        </View>
    );


}