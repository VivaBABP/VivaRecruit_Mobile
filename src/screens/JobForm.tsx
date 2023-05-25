import {View, Text, StyleSheet, ScrollView, Switch} from 'react-native'
import React, {useEffect, useState} from 'react'
import { useForm, Controller } from 'react-hook-form'
import Constants from 'expo-constants'
import { Button, TextInput } from 'react-native-paper'
import {CreateJobDTO, UpdateJobDTO} from '../client/recruitBack'
import { JobService } from '../services/JobService'
import {useFocusEffect} from "@react-navigation/native";
import {ListItem} from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";
import {PaperSelect} from "react-native-paper-select";

export default function JobForm() {

  const jobService = new JobService;
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const { handleSubmit, setValue, control, reset, formState: { errors } } = useForm<CreateJobDTO>();
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const job = '';
    const [idJob, setIdJob] = useState<number>(0);
    const [jobs, setJobs] = useState<ListItem[]>([]);

    useEffect(() => {
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
        jobs.splice(0, jobs.length);
        jobService.getJobs().then((res) => {
            res.forEach((e) => {
                jobs.push({_id: e.jobId.toString(), value: e.jobName});
            })
        }).catch((err) => {alert(err)})
    }

    const setForm = (id: any) => {
        setIdJob(id.selectedList.at(0)._id);
        jobService.getJob(id.selectedList.at(0)._id).then((res) => {
            setValue('jobName', res.jobName);
            setValue('jobDescription', res.jobDescription);
            setValue('skillsNeeded', res.skillsNeeded);
        }).catch((err) =>  { console.log(JSON.stringify(err))});
    }

  return (
      <ScrollView style={styles.container}>
          <View style={styles.align}>
              <Text>Créer un poste :</Text>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
              {!isSwitchOn && <PaperSelect label="Postes" arrayList={jobs} value={job} selectedArrayList={jobs} multiEnable={false} onSelection={(id: any) => setForm(id)}/>}
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
