import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { JobService } from '../services/JobService'
import { Card, Text } from 'react-native-paper'
import { CreateJobDTO } from '../client/recruitBack'

export default function ApplyJob() {
  // const jobService = new JobService

  // const [Jobs, setJobs] = useState<CreateJobDTO[]>([])

  // useEffect(() => {
  //   getJobs();
  // }, [])


  // const getJobs = async () => {
  //   jobService.getAppliedJobs()
  //     .then((data) => {
  //       setJobs(data);
  //     })
  //     .catch((e) => {
  //       alert(e.response.message)
  //     })
  // }

  // return (
  //   <View>
  //     <FlatList
  //       data={Jobs}
  //       renderItem={({ item, index }) => (
  //         <Card style={{ margin: 13 }} key={index}>
  //           <Card.Content>
  //             <Text variant="titleLarge"> {item.jobName} </Text>
  //             <Text variant="bodyMedium"> {item.jobDescription} </Text>
  //             <Text variant='bodySmall'> {item.skillsNeeded} </Text>
  //           </Card.Content>
  //         </Card>
  //       )}
  //     />
  //   </View>
  // )

  return (
    <View>
      <Text> Salut </Text>
    </View>
  )
}