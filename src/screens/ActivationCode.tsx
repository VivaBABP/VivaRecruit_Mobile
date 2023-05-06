import { ImageBackground, StyleSheet, View } from 'react-native'
import { Text, Button, TextInput, Checkbox } from 'react-native-paper'
import React from 'react'
import { Controller, useForm } from "react-hook-form";
import Animated, { FadeInUp, FadeInDown, Value } from "react-native-reanimated";
import * as SQLite from 'expo-sqlite'
import { ValidationCodeDTO } from '../client/recruitBack';
import { AuthService } from '../services/AuthService';

// @ts-ignore
export default function ActivationCode({ route, navigation }) {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            code: '',
        }
    })
    const email = route.params;
    const authService = new AuthService;
    const dbStuff = (data: { code: string }) => {
        const parsed = parseInt(data.code);
        const validationCodeDTO = new ValidationCodeDTO;
        validationCodeDTO.email = email;
        validationCodeDTO.code = parsed;
        authService.validation(validationCodeDTO)
            .then(() => {
                navigation.navigate("Tab");
            })
            .catch((e) => {
                console.log(JSON.stringify(e.response.message));
            })
    }

    const styles = StyleSheet.create({
        container: {
            flex: 2,
            flexDirection: 'column',
            gap: 40,
            alignItems: 'center',
        },
        input: {},
        connection: {
            width: '70%'
        },
        image: {
            flex: 1,
            justifyContent: 'center'
        },
        rounded: {
            width: '70%',
            borderRadius: 25,
            overflow: 'hidden',
            borderStyle: 'solid',
            borderColor: '#0000',
        }
    })

    return (
        <ImageBackground style={styles.image} source={require('./../../assets/images/background-gradient-phone.png')}
            resizeMode='cover'>
            <View style={styles.container}>
                <Animated.Text entering={FadeInDown} exiting={FadeInUp}>Page d'activation</Animated.Text>
                <View style={styles.rounded}>
                    <Controller rules={{ required: true }}
                        name="code"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Code de validation"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                keyboardType='numeric'
                                value={value}
                            />
                        )}
                    />
                </View>
                {(errors.code) && <Text>Champ obligatoire invalide</Text>}

                <Button style={styles.connection} onPress={handleSubmit(dbStuff)} mode='contained'>Valider l'inscription
                </Button>

            </View>
        </ImageBackground>
    )
}