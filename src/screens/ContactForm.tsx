import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Constants from 'expo-constants'
import { Button, TextInput} from 'react-native-paper'


export default function ContactForm() {
  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      phoneNumber: '',
      lastDiploma: ''
    }
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onChange = (arg: { nativeEvent: { text: any; }; }) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  console.log('errors', errors);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Numéro de téléphone</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="phoneNumber"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Dernier diplôme obtenu</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
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
          onPress={() => {
            reset({
              phoneNumber: '',
              lastDiploma: ''
            })
          }}
        >Reset</Button>
      </View>

      <View style={styles.button}>
        <Button
          onPress={handleSubmit(onSubmit)}
        >Valider</Button>
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
      marginTop: 40,
      color: 'white',
      height: 40,
      backgroundColor: 'White',
      borderRadius: 4,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
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
