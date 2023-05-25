import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Text, Button, TextInput, Checkbox } from 'react-native-paper'
import React, {useContext} from 'react'
import { Controller, useForm } from "react-hook-form";
import Animated, { FadeInUp, FadeInDown, Value } from "react-native-reanimated";
import { ValidationCodeDTO } from '../client/recruitBack';
import { AuthService } from '../services/AuthService';
import {createInfoUserCandidat} from "../services/Database";
import {AuthContext} from "../context/AuthContext";

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

    const { login } = useContext(AuthContext);
    const dbStuff = (data: { code: string }) => {
        const parsed = parseInt(data.code);
        const validationCodeDTO = new ValidationCodeDTO;
        validationCodeDTO.email = email;
        validationCodeDTO.code = parsed;
        createInfoUserCandidat(email).then().catch();
        authService.validation(validationCodeDTO)
            .then((res) => {
                login(res);
            })
            .catch((e) => {
                console.log(JSON.stringify(e.response.message));
            })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.align}>
                <Image
                    style={styles.image}
                    source={require('./../../assets/logo/adaptive-icon_vivatech.png')}
                />
                <Animated.Text entering={FadeInDown} exiting={FadeInUp}>Veuillez renseignez le code reçu par mail</Animated.Text>
                <View style={styles.inputs}>
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
                                mode='outlined'
                            />
                        )}
                    />
                </View>
                {(errors.code) && <Text>Champ obligatoire invalide</Text>}

                <Button style={styles.button} onPress={handleSubmit(dbStuff)} mode='contained'>Valider l'inscription
                </Button>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'column',
    },
    input: {
        marginBottom: 30,
        display: 'flex',
        alignItems: 'flex-start',
        padding: 0,
    },
    connection: {
        width: '70%',
        marginBottom: 50
    },
    image: {
        flex: 1,
        width: 250,
        height: 200,
        marginTop: 50
    },
    inputs: {
        width: '60%',
        overflow: 'hidden',
        borderStyle: 'solid',
        borderColor: '#0000',
    },
    button: {
        marginBottom: 30,
    backgroundColor: '#EC4D0C'
    },
    align: {
        alignItems: 'center'
    }
})