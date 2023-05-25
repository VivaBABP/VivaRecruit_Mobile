import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Constants from 'expo-constants'
import { Button, TextInput } from 'react-native-paper'
import { CreateJobDTO } from '../client/recruitBack'
import { JobService } from '../services/JobService'
import { color } from 'react-native-reanimated'

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
      <View style={styles.align}>
        <Text style={styles.label}>Intitulé du poste:</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              mode='outlined'
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
              style={styles.inputDescription}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              multiline
              mode='outlined'
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
              mode='outlined'
            />
          )}
          name="skillsNeeded"
        />

        <View style={styles.connection}>
          <Button style={styles.button}
            onPress={handleSubmit(onSubmit)}
            mode='contained'>
            Valider
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: '700',
    alignSelf: 'center',
    color: '#000000',
    margin: 20,
    marginLeft: 0,
  },
  connection: {
    width: '70%',
    marginBottom: 50
  },
  button: {
    marginTop: 40,
    backgroundColor: '#EC4D0C',
    fontFamily: '700'
    // text: 'white'

  },
  container: {
    flex: 2,
    flexDirection: 'column',
    fontFamily: '700'
  },
  input: {
    width: '60%',
    // height: 60,
    overflow: 'hidden',
    borderStyle: 'solid',
    borderColor: '#0000',
  },
  align: {
    alignItems: 'center'
  },
  inputDescription : {
    width: '60%',
    height: 100,
    overflow: 'hidden',
    borderStyle: 'solid',
    borderColor: '#0000',

  }
});
