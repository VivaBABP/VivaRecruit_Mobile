import React, {useContext, useEffect, useState} from "react";
import {PanelService} from "../../services/PanelService";
import {GetPanelDto} from "../../client/recruitBack";
import {FlatList, View} from "react-native";
import {Button, Card, Text} from "react-native-paper";

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
                    <Card style={{ margin: 13 }} key={index}>
                        <Card.Content>
                            <Text variant="titleLarge"> Nom de stand : {item.panelName} </Text>
                            <Text variant="bodyMedium"> Nom de l'entreprise : {item.companyName} </Text>
                            <Text variant='bodySmall'> Type de stand : {item.interestLabel} </Text>
                        </Card.Content>
                    </Card>
                )}
            />
            {!panels  && <Text>Aucun stand trouvé</Text>}
        </View>
    )
}