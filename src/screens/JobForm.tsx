import {View, Text, StyleSheet, ScrollView, Switch} from 'react-native'
import React, {useState} from 'react'
import { useForm, Controller } from 'react-hook-form'
import Constants from 'expo-constants'
import { Button, TextInput } from 'react-native-paper'
import {CreateJobDTO, UpdateJobDTO} from '../client/recruitBack'
import { JobService } from '../services/JobService'
import {PaperSelect} from "react-native-paper-select";
import {useFocusEffect} from "@react-navigation/native";
import {ListItem} from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";

export default function JobForm() {

  const jobService = new JobService;
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const { handleSubmit, setValue, control, reset, formState: { errors } } = useForm<CreateJobDTO>();
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const [idJob, setIdJob] = useState<number>(0);
    const [jobs, setJobs] = useState<ListItem[]>([]);

    useFocusEffect(() => {
        getJobs();
    })
  const onSubmit = (data: CreateJobDTO) => {
      if(isSwitchOn){
    jobService.createJob(data)
      .then((data) => {
        alert(data)
      })
      .catch((e) => {
        console.log(e.response.message);
      })}
      else {
          jobService.updateJob({jobId: +idJob, jobName: data.jobName, skillsNeeded: data.skillsNeeded, jobDescription: data.jobDescription} as UpdateJobDTO)
              .then((res) =>{alert('Job modifié')}).catch((err) => {alert(err)});
      }
  };

    const getJobs = () => {
        jobService.getJobs().then((res) => {
            jobs.pop();
            res.forEach((e) => {
                jobs.push({_id: e.jobId.toString(), value: e.jobName});
            })
        })
    }

    const setForm = (id: any) => {
        setIdJob(id.selectedList.at(0)._id);
        jobService.getJob(idJob.toString()).then((res) => {
            setValue('jobName', res.jobName);
            setValue('jobDescription', res.jobDescription);
            setValue('skillsNeeded', res.skillsNeeded);
        })
    }

  return (
    <ScrollView style={styles.container}>
        <Text>Créer un poste :</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        {!isSwitchOn && <PaperSelect label="Postes" arrayList={jobs} value={''} selectedArrayList={jobs} multiEnable={false} onSelection={(id: any) => setForm(id)}/>}
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
