import { StyleSheet, ScrollView, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AddInterestDto, GetInterestDto } from "../client/recruitBack";
import { InteretsService } from '../services/InterestsService';
import { InterestInterface } from '../interfaces/InterestInterface';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import { ItemType } from 'react-native-dropdown-picker';

// @ts-ignore
export default function Interests({ navigation }) {

    const [open, setOpen] = useState(true);
    const [value, setValue] = useState<string[]>([]);
    const [valueDb, setvalueDb] = useState<string[]>([])
    const [items, setItems] = useState<ItemType<ValueType>[]>([]);

    const interestsService = new InteretsService


    useEffect(() => {
        findAll();
        getInterestUser();
    }, []);


    const findAll = () => {
        interestsService.findall()
            .then((response) => {
                const interest: ItemType<ValueType>[] = [];
                response.forEach(e => {
                    const result: ItemType<ValueType> = {
                        label: e.labelInterest,
                        value: e.idInterest.toString()
                    }
                    interest.push(result);
                });
                setItems(interest);
            })
            .catch((e) => {
                console.log(JSON.stringify(e))
            })
    }

    const getInterestUser = () => {
        interestsService.getInterestFromAccount()
        .then((data) => {
            const val: string[] = [];
            const db: string[] = [];
            data.forEach(d => {
                val.push(d.idInterest.toString());
                db.push(d.idInterest.toString());
            });        
            setValue(val);
            setvalueDb(db);
        })
        .catch((e) => {
            console.log(JSON.stringify(e));
        })
    }

    const dbStuff = () => {
        console.log('value', value);
        console.log('db', valueDb);
        
        const missingValues = valueDb.filter(v => !value.includes(v));
        const additionalValues = value.filter(v => !valueDb.includes(v));

        missingValues.forEach(m => {
            deleteValue(+m)
        });
        additionalValues.forEach(a => {
            addValue(+a)
        })
    }

    const addValue = (id: number) => {
        const send = new AddInterestDto({
            id: id
        })
        interestsService.addInterestToAccount(send)
        .then(() => {
            const v = value;
            const vdb = valueDb;
            v.push(id.toString());
            vdb.push(id.toString());
            setValue(v);
            setvalueDb(v);
        })
        .catch((e) => {
            console.log(JSON.stringify(e));
        })
    }

    const deleteValue = (id: number) => {
        const send = new AddInterestDto({
            id: id
        })
        interestsService.deleteInterestToAccount(send)
        .then(() => {
            const filteredArray = value.filter(v => v !== id.toString());
            setValue(filteredArray);
            setvalueDb(filteredArray);
        })
        .catch((e) => {
            console.log(JSON.stringify(e));
        })
    }


    return (
        <View>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={() => setOpen(true)}
                setValue={setValue}
                setItems={setItems}
                multiple={true}
                mode="BADGE"
                onChangeValue={() => dbStuff()}
                placeholder="sélectionner vos intérêts"
            />
        </View>

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