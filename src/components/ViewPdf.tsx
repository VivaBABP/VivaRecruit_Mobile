import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import CvService from '../services/CvService';
import { Buffer } from 'buffer'
import Pdf from 'react-native-pdf';
import * as FileSystem from 'expo-file-system';

// @ts-ignore
export default function ViewPdf({ route }) {

  const [Path, setPath] = useState<any>(null)

  const id = route.params as number;

  const cvService = new CvService;

  useEffect(() => {
    getCv(id);
  }, [])

  const getCv = async (id: number) => {
    try {
      const filePath = `${FileSystem.documentDirectory}${id}.pdf`;
      const cv = await cvService.getCv(id)
      setPath(cv);
    } catch (error) {
      console.log(error);
    }
  }

  if (!Path) {
    return (
      <View>
        <Text>chargement</Text>
      </View>
    )
  }
  else {
    return (
      <View style={styles.container}>
        <Pdf
          source={{ uri: Path }}
          style={styles.pdf} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});