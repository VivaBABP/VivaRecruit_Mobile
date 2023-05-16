import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";
import React, { useEffect } from "react";
import Constants from "expo-constants";

// Ce formulaire est le formulaire de mise à jour de donnée de contact seulement pour les candidats. 
// La ligne sera créée lors de la création du compte avec le mail uniquement.

export default function CompanyForm() {
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            CompanyName: '',
            Description: '',
            WebsiteLink: '',
            LineOfBusiness: '',
            CompanyType: ''
        }
    });

    useEffect(() => {
    })

    const save = (data: { CompanyName: string, Description: string, WebsiteLink: string, LineOfBusiness: string, CompanyType: string }) => {
        console.log('création entreprise');
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
            <Text style={styles.label}>Nom de l'entreprise</Text>
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
                name="CompanyName"
            />
            {errors.CompanyName}
            <Text style={styles.label}>Description</Text>
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
                name="Description"
            />
            {errors.Description}
            <Text style={styles.label}>Lien vers le site</Text>
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
                name="WebsiteLink"
            />
            <Text style={styles.label}>Secteur d'activité</Text>
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
                name="LineOfBusiness"
            />
            <Text style={styles.label}>Type d'entreprise</Text>
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
                name="CompanyType"
            />
            <View style={styles.button}>
                <Button
                    onPress={() => {
                        reset({
                            CompanyName: '',
                            Description: '',
                            WebsiteLink: '',
                            LineOfBusiness: '',
                            CompanyType: ''
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