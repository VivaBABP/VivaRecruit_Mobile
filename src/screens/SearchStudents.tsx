import { FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Text } from 'react-native-paper'
import { AccountsService } from '../services/AccountsService'
import { InformationStudentDTO } from '../client/recruitBack'
import CvService from '../services/CvService'

// @ts-ignore
export default function SearchStudents({ navigation }) {

  const [Students, setStudents] = useState<InformationStudentDTO[]>([])

  const [isCv, setisCv] = useState<Boolean[]>([]);

  const accountsService = new AccountsService;

  const cvService = new CvService;

  useEffect(() => {
    getStudents();
  }, [])
  

  const getStudents = async () => {
    const cv: Boolean[] = [];
    accountsService.getStudents()
    .then(async (d) => {
      for (let i = 0; i < d.length; i++) {
        if (!d[i].name) d[i].name = "Prénom non renseigné"
        if (!d[i].lastName) d[i].lastName = "Nom non renseigné"
        cv[i] = await verify(d[i].id.toString());
      }
      setisCv(cv);
      setStudents(d);
    })
  }

  const verify = async (id: string): Promise<Boolean> => {
    return await cvService.ifExistUser(id);
  }



  return (
    <View>
      <FlatList
        data={Students}
        renderItem={({ item }) => (
          <Card style={{ margin: 13 }} key={item.id} onPress={async () => await verify(item.id.toString()) ? navigation.navigate('ViewPdf', item.id) : null}>
            <Card.Content>
              <Text variant="titleLarge"> {item.email} </Text>
              <Text variant="bodyMedium"> {item.name} </Text>
              <Text variant='bodySmall'> {item.lastName} </Text>
              <Text variant='bodySmall' style={{ color: 'red' }}> {isCv[item.id] ? '' : 'Pas de CV'} </Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  )
}