import {ImageBackground, StyleSheet, View} from 'react-native'
import {Text, Button, TextInput} from 'react-native-paper'
import React from 'react'
import {Controller, useForm} from "react-hook-form";
import Animated, {FadeInUp, FadeInDown} from "react-native-reanimated";

// @ts-ignore
export default function SignUp({navigation}) {
    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            mail: '',
            password: ''
        }
    })


    const onSubmit = (data: { mail: string, password: string }) => {
        navigation.navigate("Tab");
    };

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
                <Animated.Text entering={FadeInDown} exiting={FadeInUp}>Page de connexion</Animated.Text>
                <View style={styles.rounded}>
                    <Controller rules={{
                        required: true,
                        pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/, message: 'Email invalide'}
                    }}
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        keyboardType={'email-address'}
                                        style={styles.input}
                                        placeholder="Adresse mail"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        multiline={true}
                                        autoComplete={'email'}
                                        inputMode={'email'}
                                    />
                                )} name="mail"/>
                </View>
                <View style={styles.rounded}>
                    <Controller rules={{required: true}}
                                name="password"
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Mot de passe"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        secureTextEntry={true}/>
                                )}/>
                </View>
                {(errors.password || errors.mail) && <Text>Champs obligatoires invalide</Text>}
                <Button style={styles.connection} onPress={handleSubmit(onSubmit)} mode='contained'>Se
                    connecter</Button>
            </View>
        </ImageBackground>
    )
}