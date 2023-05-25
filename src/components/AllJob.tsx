import { View, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card, Divider, Text } from 'react-native-paper'
import { JobService } from '../services/JobService'
import {GetJobsDTO, UpdateJobDTO} from '../client/recruitBack'
import {err} from "react-native-svg/lib/typescript/xml";
import {useFocusEffect} from "@react-navigation/native";

export default function AllJob() {

  const jobService = new JobService

  const [Jobs, setJobs] = useState<GetJobsDTO[]>([])

  useFocusEffect(() => {
    getJobs();
  })


  const getJobs = async () => {
    jobService.getJobs()
      .then((data) => {
        setJobs(data);
      })
      .catch((e) => {
        alert(e.response.message)
      })
  }

    const getAppliedJob = async () => {
        jobService.getJobs()
            .then((data) => {
                setJobs(data);
            })
            .catch((e) => {
                alert(e.response.message)
            })
    }

  const postuler = async (idJob: number) => {
      jobService.applyJob(idJob).then((res)=> {
          alert("Job postulé ");
      }).catch((err) => {
          if(err.status == 201)
              alert("Job postulé ");
      });
  }

  return (
    <View>
      <FlatList
        data={Jobs}
        renderItem={({ item, index }) => (
          <Card style={styles.card} key={index}>
            <Card.Content>
              <Text style={styles.text} variant="titleLarge">Poste: {item.jobName} </Text>
              <Divider />
              <Text style={styles.text} variant="bodyMedium">Description: {item.jobDescription} </Text>

              <Text style={styles.text} variant='bodySmall'>Compétence: {item.skillsNeeded} </Text>
            </Card.Content>
              <Card.Actions>
                  { !item.applied ? <Button onPress={() => postuler(item.jobId)}>Postuler</Button> : <Text>Postulé</Text> }
              </Card.Actions>
          </Card>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 13,
    backgroundColor: '#EC4D0C',
    borderWidth: 1,
   borderColor: 'white'
  },
  text:{
    fontFamily: '700',
    color: 'white',
  }
})

