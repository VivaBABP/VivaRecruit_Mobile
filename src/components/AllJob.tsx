import { View, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Divider, Text } from 'react-native-paper'
import { JobService } from '../services/JobService'
import { UpdateJobDTO } from '../client/recruitBack'

export default function AllJob() {

  const jobService = new JobService

  const [Jobs, setJobs] = useState<UpdateJobDTO[]>([])

  useEffect(() => {
    getJobs();
  }, [])


  const getJobs = async () => {
    jobService.getJobs()
      .then((data) => {
        setJobs(data);
      })
      .catch((e) => {
        alert(e.response.message)
      })
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
  
