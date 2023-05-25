import {PanelService} from "../../services/PanelService";
import React, { useState} from "react";
import {GetPanelDto} from "../../client/recruitBack";
import {FlatList, View} from "react-native";
import {Card, Text} from "react-native-paper";
import {useFocusEffect} from "@react-navigation/native";

export default function SuggestedStands() {

    const panelService = new PanelService;

    const [panels, setPanels] = useState<GetPanelDto[]>([])

    useFocusEffect(() => {
        getPanels();
    })

    const getPanels = () => {
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