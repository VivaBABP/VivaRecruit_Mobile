import {ImageBackground, StyleSheet, View} from 'react-native'
import {Text, Button, TextInput} from 'react-native-paper'
import React from 'react'
import {Controller, useForm} from "react-hook-form";
import Animated, {FadeInUp, FadeInDown} from "react-native-reanimated";
import * as SQLite from 'expo-sqlite'

// @ts-ignore
export default function SignIn({navigation}) {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            mail: '',
            password: ''
        }
    })


    const db = SQLite.openDatabase(
        'test.db'
    )
    console.log(db);


    const createTables =  () => {
        db.transaction( (tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS cv (id INTEGER PRIMARY KEY AUTOINCREMENT , cv BLOB)', [],
                (transaction, resultSet) => {
                    console.log("Succes table cv :", resultSet);
                }, (transaction, error) => {
                    console.log(error);
                });
        })
        db.transaction( (tx) => {
            // @ts-ignore
            tx.executeSql('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT , mail TEXT, password TEXT)', [],
                (transaction, resultSet) => {
                    console.log("Succes table user : ", resultSet);
                }, (transaction, error) => {
                    console.log(error);
                });
        })
    }

    const insterUser = (data: { mail: string, password: string }) => {
        db.transaction( (tx) => {
            tx.executeSql('INSERT INTO user(mail,password) VALUES (?1, ?2)', [data.mail, data.password], (transaction, resultSet) => {
                console.log("MA CREATION DE USER : ", resultSet);
            }, (transaction, error) => {
                console.log("Mon erreur : ", error);
            });
        })
        db.transaction( (tx) => {
             tx.executeSql('SELECT * from user', [], (transaction, resultSet) => {
                console.log("Mes données sql : ", resultSet);
            }, (transaction, error) => {
                console.log("Mon erreur fetch données : ", error);
            });
        })
    }

    const dbStuff = (data: { mail: string, password: string }) => {
        createTables();
        insterUser(data);
        onSubmit(data);
    }

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
                                multiline={true}
                                autoComplete={'email'}
                                inputMode={'email'}
                            />
                        )} name="mail" />
                </View>
                <View style={styles.rounded}>
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
                                secureTextEntry={true} />
                        )} />
                </View>
                {(errors.password || errors.mail) && <Text>Champs obligatoires invalide</Text>}
                <Button style={styles.connection} onPress={handleSubmit(dbStuff)} mode='contained'>Se
                    connecter</Button>
            </View>
        </ImageBackground>
    )
}