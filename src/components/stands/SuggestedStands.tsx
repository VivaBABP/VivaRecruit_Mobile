import React, {useContext, useEffect, useState} from "react";
import {PanelService} from "../../services/PanelService";
import {GetPanelDto} from "../../client/recruitBack";
import {FlatList, View, StyleSheet} from "react-native";
import {Button, Card, Divider, Text} from "react-native-paper";

export default function SuggestedStands() {

    const panelService = new PanelService;

    const [panels, setPanels] = useState<GetPanelDto[]>([])

    useEffect(() => {
        getPanels().then(r => {console.log("test")});
    }, [])

    const getPanels = async() => {
        panelService.suggest().then((data) => {
            setPanels(data);
        }).catch((err) => {
            setPanels(err.response);
        })
 
    }

    return (
        <View>
            <FlatList
                data={panels}
                renderItem={({ item, index }) => (
                    <Card style={styles.card} key={index}>
                        <Card.Content>
                            <Text style={styles.text} variant="titleLarge"> Nom de stand : {item.panelName} </Text>
                            <Divider/>
                            <Text style={styles.text} variant="bodyMedium"> Nom de l'entreprise : {item.companyName} </Text>
                            <Text style={styles.text} variant='bodySmall'> Type de stand : {item.interestLabel} </Text>
                        </Card.Content>
                    </Card>
                )}
            />
            {panels.length == 0 && <Text style={styles.textStand}>Veuillez choisir des intérêts</Text>}
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
    },
    textStand:{
        fontFamily: '700',
        marginTop: 50,
        textAlign: 'center',
    }
  })