import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";
import React from "react";
import { createTableInfoUser, getInfoUsers, insertInfoUser, updateInfoUser } from "../services/Database";
import Constants from "expo-constants";
import { AccountsService } from "../services/AccountsService";
import { InformationUserDTO } from "../client/recruitBack";
import { useFocusEffect } from "@react-navigation/native";

// Ce formulaire est le formulaire de mise à jour de donnée de contact seulement pour les candidats. 
// La ligne sera créée lors de la création du compte avec le mail uniquement.

export default function ContactForm() {
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm<InformationUserDTO>();

    const accountService = new AccountsService;

    let infos = false;

    useFocusEffect(() => {
        createTableInfoUser()
        getInfoUsers().then((res) => {
            if (res.rows.length > 0) {
                const user = res.rows.item(0) as InformationUserDTO;
                console.log(user);
                setValue('nom', user.nom);
                setValue('prenom', user.prenom);
                setValue('mail', user.mail);
                setValue('phoneNumber', user.phoneNumber);
                setValue('lastDiploma', user.lastDiploma);
            }
            res.rows.length > 0 ? infos = true : infos = false;
            console.log(res.rows.length);
        }).catch((error) => {
            console.log(error.message, " erreurs");
        });
    })

    const save = async (data: InformationUserDTO) => {
        if (infos) {
            updateInfoUser(data).then((res) => {
                console.log(res);
            }).catch((error) => {
                console.log('error', error.message);
            });
        } else {
            await insertInfoUser(data);
        }
        await accountService.updateInfoUser(data);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Numéro de téléphone</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        keyboardType={'phone-pad'}
                        placeholder={"commençant par : +"}
                    />
                )}
                name="phoneNumber"
                rules={{ required: true, pattern: { value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, message: 'Format de téléphone invalide' } }}
            />
            {errors.phoneNumber && <Text>Numéro de téléphone incorrect</Text>}
            <Text style={styles.label}>Mail</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        keyboardType={'email-address'}
                    />
                )}
                name="mail"
                rules={{ required: true, pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/, message: 'Email invalide' } }}
            />
            {errors.mail && <Text>Mail incorrect</Text>}
            <Text style={styles.label}>Nom</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="nom"
                rules={{ required: true }}
            />
            <Text style={styles.label}>Prenom</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="prenom"
                rules={{ required: true }}
            />
            <Text style={styles.label}>Dernier diplôme obtenu</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="lastDiploma"
                rules={{ required: true }}
            />
            <View style={styles.button}>

                <Button
                    style={{
                        backgroundColor: '#EC4D0C'
                    }}
                    mode="contained"
                    onPress={handleSubmit(save)}
                >Valider
                </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: '700',
        alignSelf: 'center',
        color: '#000000',
        margin: 20,
        marginLeft: 0,
    },
    createCompany: {
        fontFamily: '700',
        alignSelf: 'center',
        color: '#000000',
        margin: 20,
        marginLeft: '25%',
    },
    connection: {
        width: '70%',
        marginBottom: 50
    },
    button: {
        margin: 30,
        // backgroundColor: '#EC4D0C',
        fontFamily: '700'

    },
    container: {
        flex: 1,
        fontFamily: '700'
    },
    input: {
        // width: '60%',
        marginRight: '10%',
        marginLeft: '10%',
        // height: 60,
        overflow: 'hidden',
        borderStyle: 'solid',
        borderColor: '#0000',
    },
    align: {
        alignItems: 'center'
    },
    inputDescription: {
        width: '60%',
        height: 100,
        overflow: 'hidden',
        borderStyle: 'solid',
        borderColor: '#0000',

    }
});