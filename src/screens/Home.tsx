import {View, Text, Button, useWindowDimensions, StyleSheet} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import SeeStands from "../components/stands/SeeStands";
import SuggestedStands from "../components/stands/SuggestedStands";
import Interests from './Interests';

export default function Home() {

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);

    const [routes] = useState([
        {key: 'suggestedStands', title: 'Stands suggéré'},
        {key: 'seeStands', title: 'Tous les stands'},
        {key: 'interests', title: 'Vos intérêts'},

    ]);

    const renderScene = SceneMap({
        suggestedStands: SuggestedStands,
        seeStands: SeeStands,
        interests: Interests
    });


    return (
        <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
            renderTabBar={
                (props) => (
                    <TabBar
                        {...props}
                        renderLabel={({route}) => (
                            <Text style={styles.title}>
                                {route.title}
                            </Text>
                        )}
                        indicatorStyle={{ backgroundColor: '#EC4D0C' }}
                        style={{
                            backgroundColor: 'white'
                        }}
                    />
                )
            }
        />
    )
}
const styles = StyleSheet.create({
    title:{
      fontFamily: '700',
      color: 'black'
    },
    
  })