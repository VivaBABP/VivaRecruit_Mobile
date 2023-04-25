import {StyleSheet, View} from 'react-native'
import {TextInput, Text, Button} from 'react-native-paper'
import React from 'react'
import {Controller, useForm} from "react-hook-form";

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
    return (
        <View>
            <Text variant='headlineMedium'>Page de connexion</Text>
            <Controller rules={{required: true}}
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                placeholder="Adresse mail"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )} name="mail"/>
            {errors.mail && <Text>Le mail est obligatoire pour se connecter</Text>}
            <Controller rules={{required: true}}
                        name="password"
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput placeholder="Mot de passe"
                                       onBlur={onBlur}
                                       onChangeText={onChange}
                                       value={value}
                                       secureTextEntry={true}/>
                        )}/>
            {errors.password && <Text>Le mot de passe est obligatoire pour se connecter</Text>}
            <Button onPress={handleSubmit(onSubmit)}>Se connecter</Button>
        </View>
    )
}