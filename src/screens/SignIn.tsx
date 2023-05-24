import { Image, StyleSheet, View } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper'
import React, { useContext, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { CredentialDTO } from "../client/recruitBack";
import { AuthService } from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";

// @ts-ignore
export default function SignIn({ navigation }) {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<CredentialDTO>();

    const { login } = useContext(AuthContext);

    const authServoce = new AuthService;
    const [error, setError] = useState('');

    const onSubmit = (credentials: CredentialDTO) => {
        authServoce.signIn(credentials).then((res) => {
            login(res);
        }).catch((e) => {
            setError(e.response.message);
        })
    };

    const styles = StyleSheet.create({
        container: {
            flex: 2,
            flexDirection: 'column',
            alignItems: 'center',
        },
        input: {
            marginBottom: 60,
            display: 'flex',
            alignItems: 'flex-start',
            padding: 0,
            borderColor: '#00ccff'
        },
        connection: {
            width: '70%',
            marginBottom: 50
        },
        image: {
            flex: 1,
            resizeMode: 'center',
            width: 250,
            height: 200,
            marginTop: 80
        },
        inputs: {
            width: '60%',
            overflow: 'hidden',
            borderStyle: 'solid',
            borderColor: '#0000',
        }
    })

    return (
        <View style={styles.container}>
            <Text style={{fontFamily: '700'}}>Test Police</Text>
            <Image
                style={styles.image}
                source={require('./../../assets/logo/adaptive-icon_vivatech.png')}
            />
            <View style={styles.inputs}>
                <Controller rules={{
                    required: true,
                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/, message: 'Email invalide' }
                }}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            keyboardType={'email-address'}
                            style={styles.input}
                            placeholder="Adresse mail"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoComplete={'email'}
                            inputMode={'email'}
                            mode='outlined'
                            label="mail"
                            underlineColor='#00ccff'
                        />
                    )} name="email" />
            </View>
            <View style={styles.inputs}>
                <Controller rules={{ required: true }}
                    name="password"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry={true}
                            mode='outlined' />
                    )} />
            </View>
            {(errors.password || errors.email) ? <Text>Champs obligatoires invalide</Text> : <Text>{error}</Text>}
            <Button style={styles.connection} onPress={handleSubmit(onSubmit)} mode='contained'>Se
                connecter</Button>
            <Button style={styles.connection} onPress={() => navigation.navigate("SignUp")} mode='contained'>S'inscrire
            </Button>
        </View>
    )
}