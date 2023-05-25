import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { Text } from "react-native-paper"
import { SceneMap, TabView, TabBar } from "react-native-tab-view";
import ContactForm from "../components/ContactForm";
import GenerateQrCode from "../components/GenerateQrCode";

export default function CandidateInfo () {

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'contactForm', title: 'Formulaire de Contact' },
    { key: 'generateQrCode', title: 'QR code' },
  ]);

  const renderScene = SceneMap({
    contactForm: ContactForm,
    generateQrCode: GenerateQrCode,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={
        (props) => (
          <TabBar
            {...props}
            renderLabel={({ route }) => (
              <Text style={{ color: 'black' }}>
                {route.title}
              </Text>
            )}
            style={{
              backgroundColor: 'white'

            }}
          />
        )
      }
    />
  )
}