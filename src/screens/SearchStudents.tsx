import { FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Text } from 'react-native-paper'
import { AccountsService } from '../services/AccountsService'
import { InformationStudentDTO } from '../client/recruitBack'

// @ts-ignore
export default function SearchStudents({ navigation }) {

  const [Students, setStudents] = useState<InformationStudentDTO[]>([])

  const accountsService = new AccountsService;

  useEffect(() => {
    getStudents();
  }, [])
  

  const getStudents = async () => {
    accountsService.getStudents()
    .then((d) => {
      for (let i = 0; i < d.length; i++) {
        if (!d[i].name) d[i].name = "Prénom non renseigné"
        if (!d[i].lastName) d[i].lastName = "Nom non renseigné"
      }
      setStudents(d);
    })
  }

  return (
    <View>
      <FlatList
        data={Students}
        renderItem={({ item }) => (
          <Card style={{ margin: 13 }} key={item.id} onPress={() => navigation.navigate('ViewPdf', item.id)}>
            <Card.Content>
              <Text variant="titleLarge"> {item.email} </Text>
              <Text variant="bodyMedium"> {item.name} </Text>
              <Text variant='bodySmall'> {item.lastName} </Text>
              <Text variant='bodySmall'> s </Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  )
}