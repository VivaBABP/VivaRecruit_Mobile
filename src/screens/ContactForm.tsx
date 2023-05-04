import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Constants from 'expo-constants'
import { Button, TextInput} from 'react-native-paper'
import * as SQLite from 'expo-sqlite'


export default function ContactForm() {
  const db = SQLite.openDatabase('contact.db');
  const [ info, setInfo ] = useState([] as any[]);
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ diploma, setDiploma ] = useState('');
  

  useEffect(() => {
    createTableInfo();

    getInfo();

  }, []);

  const setInfoDb = () => {
    db.transaction(tx => {

      tx.executeSql('INSERT INTO info (phoneNumber,diploma) VALUES(?1 , ?2)', [phoneNumber,diploma], (transaction, resultSet) => {
        console.log('Row added')
      })
    });
  }

  const getInfo = () => {
    db.transaction(txn => txn.executeSql('SELECT * FROM info', [],
      (sqlTxn: SQLite.SQLTransaction, res: SQLite.SQLResultSet) => {
        let len = res.rows.length;
        console.log(len)
        if( len > 0) {
          let results = [];

          for(let i = 0; i < len; i++) {
            let item = res.rows.item(i);
            console.log("Result n°",i,": ", item);
            results.push({id: item.id, phoneNumber: item.phoneNumber, diploma: item.diploma})
          }
          setInfo(results);
        }
      }
    ));
  }

  const createTableInfo = () =>{
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS info (id INTEGER PRIMARY KEY AUTOINCREMENT,  phoneNumber INTEGER, diploma TEXT)')
    });
  }

  const deleteTable = () => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE info')
    });
    createTableInfo();
  }

  const { handleSubmit, control } = useForm({
    defaultValues: {
      phoneNumber: '',
      lastDiploma: ''
    }
  });

  const onSubmit = () => {
    console.log("diplome: ",diploma,", phone number: ", phoneNumber);
    setInfoDb();
    getInfo();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Numéro de téléphone :</Text>
      <Controller
        control={control}
        render={({field: { onBlur }}) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          />
        )}
        name="phoneNumber"
        rules={{ required: false }}
      />
      <Text style={styles.label}>Dernier diplôme obtenu :</Text>
      <Controller
        control={control}
        render={({field: { onBlur }}) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={setDiploma}
          value={diploma}
          />
        )}
        name="lastDiploma"
        rules={{ required: false }}
      />
      <View style={styles.button}>
        <Button
          onPress={handleSubmit(onSubmit)}
        >Valider</Button>
        <Button onPress={deleteTable
        }>
          Reset Data
        </Button>
      </View>
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