import React, {useContext, useEffect, useState} from "react";
import {FlatList, View, StyleSheet} from "react-native";
import {Button, Card, Divider, Text} from "react-native-paper";
import {GetPanelDto} from "../../client/recruitBack";
import {PanelService} from "../../services/PanelService";
import { AuthContext } from "../../context/AuthContext";

export default function SeeStands() {

    const panelService = new PanelService;

    const [panels, setPanels] = useState<GetPanelDto[]>([])

    useEffect(() => {
        getPanels();
    }, [])

    const getPanels = async () => {
        panelService.findAll().then((data) => {
            setPanels(data);
        }).catch((error) => {
            console.log(JSON.stringify(error));
        })
    }

    return (
        <View>
            <FlatList
                data={panels}
                renderItem={({item, index}) => (
                    <Card style={styles.card} key={index}>
                        <Card.Content>
                            <Text style={styles.text} variant="titleLarge"> Nom du stand : {item.panelName} </Text>
                            <Divider />
                            <Text style={styles.text} variant="bodyMedium"> Nom de l'entreprise : {item.companyName} </Text>
                            <Text style={styles.text} variant='bodySmall'> Type de stand : {item.interestLabel} </Text>
                        </Card.Content>
                    </Card>
                )}
            />
            {panels.length == 0 && <Text style={styles.textStand}>Aucun stand trouvé</Text>}
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