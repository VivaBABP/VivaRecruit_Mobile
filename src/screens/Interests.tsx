import { ImageBackground, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper'
import React, { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import Animated, { FadeInUp, FadeInDown, Value } from "react-native-reanimated";
import { AddInterestDto, CredentialDTO, GetInterestDto } from "../client/recruitBack";
import { AuthService } from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import { blue100 } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { InteretsService } from '../services/InterestsService';
import { InterestInterface } from '../interfaces/InterestInterface';
import { err } from 'react-native-svg/lib/typescript/xml';

// @ts-ignore
export default function Interests({ navigation }) {

    const [selected, setSelected] = useState("");
    const [data, setData] = useState<InterestInterface[]>([]);
    const interestsService = new InteretsService

    useEffect(() => {
        findAll();
    }, []);


    const findAll = () => {
        interestsService.findall()
            .then((response) => {
                const interest: InterestInterface[] = [];
                response.forEach(e => {
                    const result: InterestInterface = {
                        key: e.idInterest.toString(),
                        value: e.labelInterest
                    }
                    interest.push(result);
                });
                setData(interest);
            })
            .catch((e) => {
                console.log(JSON.stringify(e))
            })
    }



    const dbStuff = () => {
       const ISelect = Array.from(selected)
        console.log(ISelect);
        ISelect.forEach(selected => interestsService.addInterestToAccount({ id: +selected } as AddInterestDto)
        .then((ISelect) =>{
            console.log("Marche");
        })
        .catch((err) => {
            console.log(JSON.stringify(err));
            
        })
        );
        

    }

    const styles = StyleSheet.create({
        container: {
            flex: 2,
            flexDirection: 'column',
            gap: 40,
            alignItems: 'center',
            margin: 40
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
        },



    })

    return (
        <View style={{ paddingHorizontal: 20, paddingVertical: 50, flex: 1 }}>
            <MultipleSelectList
                setSelected={(val: React.SetStateAction<string>) => setSelected(val)}
                data={data}
                search={false}
                save="key"
                label="intérêts"
                placeholder='sélectionner vos intérêts'
                boxStyles={{ backgroundColor: 'blueviolet', borderColor: 'black' }}
                inputStyles={{ color: 'white' }}
                dropdownStyles={{ backgroundColor: 'blueviolet', borderColor: 'black' }}
                dropdownTextStyles={{ color: 'white' }}
            />
            <Button onPress={dbStuff}>Valider</Button>
        </View>


    )
}


