import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Constants from 'expo-constants'
import { Button, TextInput} from 'react-native-paper'
import * as SQLite from 'expo-sqlite'
import { FlatList } from 'react-native'


export default function ContactForm() {
  const db = SQLite.openDatabase('contact.db');
  const [ info, setInfo ] = useState([] as any[]);
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ diploma, setDiploma ] = useState('');


  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS info (id INTEGER PRIMARY KEY AUTOINCREMENT,  phoneNumber INTEGER, diploma TEXT)')
    });

    getInfo();

  }, []);

  const getInfo = () => {
    db.transaction(txn => txn.executeSql('SELECT * FROM info', [],
      (sqlTxn: SQLite.SQLTransaction, res: SQLite.SQLResultSet) => {
        let len = res.rows.length;

        if( len > 0) {
          let results = [];

          for(let i = 0; i < len; i++) {
            let item = res.rows.item(i);
            console.log("Results : ", results)
            results.push({id: item.id, phoneNumber: item.phoneNumber})
          }
          setInfo(results);
        }
      }
    ));
  }

  const renderInfo = ({item}) => {
    return (
      <View>
        <Text>
          {item.id} - {item.phoneNumber}
        </Text>
      </View>
    )
  }
  

  const { handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      phoneNumber: '',
      lastDiploma: ''
    }
  });

  const onSubmit = (data: {phoneNumber : string, lastDiploma : string}) => {
    console.log(data);

    getInfo();
  };


  console.log('errors', errors);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Numéro de téléphone</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={setDiploma}
          value={diploma}
        />
      </View>
      <View style={styles.button}>
        <Button
          onPress={handleSubmit(onSubmit)}
        >Valider</Button>
      </View>
      <FlatList data={info} renderItem={renderInfo}></FlatList>
    </View>
  )
}

  const styles = StyleSheet.create({
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
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
      padding: 8,
      backgroundColor: 'White',
    },
    input: {
      backgroundColor: 'white',
      borderColor: '#000000',
      borderBottomWidth: 2,
      height: 40,
      padding: 10,
      borderRadius: 4,
    },
  });
