import React, {useContext, useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import {Button, Card, Text} from "react-native-paper";
import {GetPanelDto} from "../../client/recruitBack";
import {PanelService} from "../../services/PanelService";

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
            console.log(error);
        })
    }

    return (
        <View>
            <FlatList
                data={panels}
                renderItem={({item, index}) => (
                    <Card style={{margin: 13}} key={index}>
                        <Card.Content>
                            <Text variant="titleLarge"> Nom de stand : {item.panelName} </Text>
                            <Text variant="bodyMedium"> Nom de l'entreprise : {item.companyName} </Text>
                            <Text variant='bodySmall'> Type de stand : {item.interestLabel} </Text>
                        </Card.Content>
                    </Card>
                )}
            />
            {panels.length == 0 && <Text>Aucun stand trouvé</Text>}
        </View>
    )
}