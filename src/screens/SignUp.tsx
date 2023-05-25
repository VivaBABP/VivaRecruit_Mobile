import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Text, Button, TextInput, Checkbox } from 'react-native-paper'
import React from 'react'
import { Controller, useForm } from "react-hook-form";
import { CreateUserDTO } from '../client/recruitBack';
import { AuthService } from '../services/AuthService';

// @ts-ignore
export default function SignUp({ navigation }) {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<CreateUserDTO>()


    const authService = new AuthService;
    const dbStuff = (data: CreateUserDTO) => {
        data.recruit = checked;
        authService.signUp(data)
            .then(() => {
                navigation.navigate("ActivationCode", data.email);
            })
            .catch((e) => {
                console.log(JSON.stringify(e.response.message));
            })
    }
    const [checked, setChecked] = React.useState(false);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.align}>
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
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                autoComplete={'email'}
                                inputMode={'email'}
                                mode='outlined'
                                placeholder="Adresse mail"
                                
                            />
                        )}
                        name='email'
                    />
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
                                mode='outlined'
                            />
                        )}
                    />
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                    <Text style={{fontFamily: '700', alignSelf: 'center'}}>Je suis un recruteur</Text>
                </View>
                {(errors.password || errors.email) && <Text>Champs obligatoires invalide</Text>}
                <View style={styles.connection}>
                    <Button style={styles.button} onPress={handleSubmit(dbStuff)} mode='contained'>S'inscrire
                    </Button>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'column',
        fontFamily: '700'
    },
    input: {
        marginBottom: 30,
        display: 'flex',
        alignItems: 'flex-start',
        padding: 0,
        fontFamily: '700'
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
        backgroundColor: '#EC4D0C',
        fontFamily: '700'
    },
    checkboxContainer: {
        marginBottom: 30,
        flexDirection: 'row',
    },
    checkbox: {
        alignSelf: 'center',
    },
    align: {
        alignItems: 'center'
    }
})