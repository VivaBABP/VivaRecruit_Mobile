import {StyleSheet, View, Text, Button} from 'react-native'
import React from 'react'
import {Controller, useForm} from "react-hook-form";
import {Stack, TextInput} from "@react-native-material/core"

// @ts-ignore
export default function SignUp({navigation}) {
    const { control, handleSubmit, formState: { errors} } = useForm({
        defaultValues: {
            mail: '',
            password: ''
        }
    })

    const onSubmit = (data: {mail : string, password : string}) =>  {
        navigation.navigate("Tab");
    };
    return (
        <Stack m={2} spacing={1}>
            <Text>Page de connexion</Text>
            <Controller rules={{ required: true}} control={control} render={({ field : {onChange, onBlur, value}}) => (
                <TextInput
                    placeholder="Adresse mail"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    variant="standard"
                    />
            )} name="mail"/>
            {errors.mail && <Text>Le mail est obligatoire pour se connecter</Text>}
            <Controller rules={{required: true}} name="password" control={control} render={({ field: {onChange,onBlur,value}}) => (
                <TextInput placeholder="Mot de passe"
                           onBlur={onBlur}
                           onChangeText={onChange}
                           value={value}
                           secureTextEntry={true}
                variant="standard"/>
            )} />
            {errors.password && <Text>Le mot de passe est obligatoire pour se connecter</Text>}
            <Button title="Se connecter" onPress={handleSubmit(onSubmit)}/>
        </Stack>
    )
}