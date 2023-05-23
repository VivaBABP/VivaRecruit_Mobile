import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import CvService from '../services/CvService';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';
import { Buffer } from 'buffer'

// @ts-ignore
export default function ViewPdf({ route }) {

  const [PdfBase64, setPdfBase64] = useState("")

  const id = route.params as number;

  const cvService = new CvService;

  useEffect(() => {
    getCv(id);
  }, [])

  const getCv = async (id: number) => {
    try {
      const cv = await cvService.getCv(id)
      const pdf = Buffer.from(cv.data).toString('base64');
      setPdfBase64(pdf);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Text>Je teste des trucs</Text>
    </View>
  )
}