import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Button} from 'react-native-paper'
import {createTableInfoUser} from "../services/Database";

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
        alert(`Bar code with type ${donnee.type} and data ${donnee.data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === 'false') {
        return <Text>No access to camera</Text>;
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
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button onPress={() => setScanned(false)}>Tap to Scan Again</Button>}
        </View>
    );


}