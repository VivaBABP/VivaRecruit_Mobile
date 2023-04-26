import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigations/AppNavigator';

export default function App() {
    return (
        <SafeAreaProvider>
            <PaperProvider>
                <AppNavigator/>
            </PaperProvider>
        </SafeAreaProvider>
    );
}


