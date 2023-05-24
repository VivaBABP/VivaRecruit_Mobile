import {View, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { JobService } from '../services/JobService'
import {Button, Card, Text} from 'react-native-paper'
import {CreateJobDTO, UpdateJobDTO} from '../client/recruitBack'
import {useFocusEffect} from "@react-navigation/native";
import {red} from "react-native-reanimated/lib/types/lib";

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
          <Card style={{ margin: 13 }} key={index}>
            <Card.Content>
              <Text variant="titleLarge"> {item.jobName} </Text>
              <Text variant="bodyMedium"> {item.jobDescription} </Text>
              <Text variant='bodySmall'> {item.skillsNeeded} </Text>
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