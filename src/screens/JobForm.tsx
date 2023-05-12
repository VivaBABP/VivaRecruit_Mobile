import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Constants from 'expo-constants'
import { Button, TextInput } from 'react-native-paper'
import { CreateJobDTO } from '../client/recruitBack'
import { JobService } from '../services/JobService'

export default function JobForm() {

  const authService = new JobService;

  const { handleSubmit, control, reset, formState: { errors } } = useForm<CreateJobDTO>();

  const onSubmit = (data: CreateJobDTO) => {
    authService.createJob(data)
      .then((data) => {
        // à changer quand on refera l'interface
        alert(data)
      })
      .catch((e) => {
        console.log(e.response.message);
      })
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Intitulé du poste:</Text>
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
        name="jobName"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Description du poste:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
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
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            multiline
          />
        )}
        name="skillsNeeded"
      />

      <View style={styles.button}>
        <Button
          onPress={() => {
            reset({
              jobDescription: '',
              skillsNeeded: '',
              jobName: ''
            })
          }}
        >
          Reset
        </Button>

        <Button
          onPress={handleSubmit(onSubmit)}
        >
          Valider
        </Button>
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
