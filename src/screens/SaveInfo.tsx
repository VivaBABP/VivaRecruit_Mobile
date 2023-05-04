import {ScrollView, Text, View, StyleSheet} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {Button, TextInput} from "react-native-paper";
import React, {useEffect} from "react";
import {createTableInfoUser, getInfoUsers, insertInfoUser} from "../services/Database";
import Constants from "expo-constants";

export default function SaveInfo() {
    const {register, setValue, handleSubmit, control, reset, formState: {errors}} = useForm({
        defaultValues: {
            mail: '',
            nom: '',
            prenom: '',
            phoneNumber: '',
        }
    });

    useEffect(() => {
        createTableInfoUser();
    })

    const save = async (data: any) => {
        await insertInfoUser(data);
        getInfoUsers().then((res) => {
            console.log("là c'est saveInfo",res);
            for (let i = 0; i < res.rows.length; i++) {
                console.log(res.rows.item(i));
            }
        });
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,

            paddingTop: Constants.statusBarHeight,
            padding: 8,
            backgroundColor: 'White',
        },
        label: {
            color: '#000000',
            margin: 20,
            marginLeft: 0,
        },
        button: {
            marginTop: 20,
            marginBottom: 70,
            color: 'white',
            height: 40,
            backgroundColor: 'White',
            borderRadius: 4,
        },
        input: {
            backgroundColor: 'white',
            borderColor: '#000000',
            borderBottomWidth: 2,
            height: 40,
            padding: 10,
            borderRadius: 4,
        },
    })

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Numéro de téléphone</Text>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="phoneNumber"
                rules={{required: true}}
            />
            <Text style={styles.label}>Mail</Text>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="mail"
                rules={{required: true}}
            />
            <Text style={styles.label}>Nom</Text>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="nom"
                rules={{required: true}}
            />
            <Text style={styles.label}>Prenom</Text>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="prenom"
                rules={{required: true}}
            />
            <View style={styles.button}>
                <Button
                    onPress={() => {
                        reset({
                            phoneNumber: '',
                            mail: '',
                            nom: '',
                            prenom: ''
                        })
                    }}
                >Reset</Button>

                <Button
                    onPress={handleSubmit(save)}
                >Valider</Button>
            </View>
        </ScrollView>
    )
}