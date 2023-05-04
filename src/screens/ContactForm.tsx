import {ScrollView, Text, View, StyleSheet} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {Button, TextInput} from "react-native-paper";
import React, {useEffect} from "react";
import {createTableInfoUser, getInfoUsers, insertInfoUser} from "../services/Database";
import Constants from "expo-constants";

export default function ContactForm() {
    const {register, setValue, handleSubmit, control, reset, formState: {errors}} = useForm({
        defaultValues: {
            mail: '',
            nom: '',
            prenom: '',
            phoneNumber: '',
            lastDiploma: ''
        }
    });

    useEffect(() => {
        createTableInfoUser().then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error.message)
        });
        getInfoUsers().then((res) =>{
            console.log(res.rows.length, ' nb items : ', res.rows._array);
        }).catch((error) => {
            console.log(error.message, " erreurs");
        })
    })

    const save = (data: { mail: string, nom: string, prenom: string, phoneNumber: string, lastDiploma: string }) => {
        insertInfoUser(data).then((res)=> {
            console.log(res);
        }).catch((error) =>{
            console.log('error',error.message);
        });
        getInfoUsers().then((res) => {
            for (let i = 0; i < res.rows.length; i++) {
                console.log(res.rows.item(i));
            }
        }).catch((error) => {
            console.error('error: ',error.message);
        });
    };

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
                        keyboardType={'phone-pad'}
                        placeholder={"commençant par : +"}
                    />
                )}
                name="phoneNumber"
                rules={{required: true,pattern:{value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, message:'Format de téléphone invalide' }}}
            />
            {errors.phoneNumber && <Text>Numéro de téléphone incorrect</Text>}
            <Text style={styles.label}>Mail</Text>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        keyboardType={'email-address'}
                    />
                )}
                name="mail"
                rules={{required: true, pattern:{value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/, message: 'Email invalide'}}}
            />
            {errors.mail && <Text>Mail incorrect</Text>}
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
            <Text style={styles.label}>Dernier diplôme obtenu</Text>
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
                name="lastDiploma"
                rules={{required: true}}
            />
            <View style={styles.button}>
                <Button
                    onPress={() => {
                        reset({
                            phoneNumber: '',
                            mail: '',
                            nom: '',
                            prenom: '',
                            lastDiploma:''
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