import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Constants from 'expo-constants'
import { Button, TextInput} from 'react-native-paper'

export default function JobForm() {
  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      jobName: '',
      jobDescription: '',
      skillsNeeded: ''
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
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Intitulé du poste:</Text>
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
        name="jobName"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Description du poste:</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            multiline
          />
        )}
        name="jobDescription"
        rules={{ required: true }}
      />

      <Text style={styles.label}>Compétences voulues:</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            multiline
          />
        )}
        name="skillsNeeded"
        rules={{ required: false }}
      />

      <View style={styles.button}>
        <Button
          onPress={() => {
            reset({
              jobName: '',
              jobDescription: '',
              skillsNeeded: ''
            })
          }}
        >Reset</Button>
  
        <Button
          onPress={handleSubmit(onSubmit)}
        >Valider</Button>
      </View>
    </ScrollView>
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
      padding: 10,
      borderRadius: 4,
    },
  });