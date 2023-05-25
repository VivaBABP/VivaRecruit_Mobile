import { View, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { JobService } from '../services/JobService'
import {Button, Card, Text } from 'react-native-paper'
import { CreateJobDTO, UpdateJobDTO } from '../client/recruitBack'
import {useFocusEffect} from "@react-navigation/native";

export default function ApplyJob() {
  const jobService = new JobService

  const [Jobs, setJobs] = useState<UpdateJobDTO[]>([])

  useFocusEffect(() => {
    getJobs();
  })


  const getJobs = async () => {
    jobService.getAppliedJobs()
      .then((data) => {
        setJobs(data);
      })
      .catch((e) => {
        alert(e.response.message)
      })
  }

  const deleteApply = async (idJob: number) => {
      jobService.deleteApplyJob(idJob).then(()=>{
          alert("Job supprimé");
          getJobs();
      });
  }

  return (
    <View>
      <FlatList
        data={Jobs}
        renderItem={({ item, index }) => (
          <Card style={styles.card} key={index}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.text}> {item.jobName} </Text>
              <Text variant="bodyMedium" style={styles.text}> {item.jobDescription} </Text>
              <Text variant='bodySmall' style={styles.text}> {item.skillsNeeded} </Text>
            </Card.Content>
              <Card.Actions>
                  <Button buttonColor={'#ff2200'} textColor={'#FFFFFF'} onPress={() => deleteApply(item.jobId)}>Annuler Candidature</Button>
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