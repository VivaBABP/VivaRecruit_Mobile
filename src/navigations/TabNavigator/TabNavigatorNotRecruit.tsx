import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import JobList from '../../screens/JobList';
import CV from '../../screens/CV';
import CandidateInfo from '../../screens/CandidateInfo';

const Tab = createBottomTabNavigator();

export function TabNavigatorNotRecruit() {
    
  return(
  <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
              position: 'absolute',
              bottom: 25,
              right: 20,
              left: 20,
              borderRadius: 20,
          }
      }}
      sceneContainerStyle={{
          marginBottom: 70
      }}
  >
      <Tab.Screen
          name='Stands'
          component={Home}
          options={{
              tabBarIcon: ({ color, size }) => (<Ionicons name="home" color={color} size={size} />)
          }}
      />
      <Tab.Screen
          name='Contact'
          component={CandidateInfo}
          options={{
              tabBarIcon: ({ color, size }) => (<Ionicons name="document-text" color={color} size={size} />)
          }}
      />
      <Tab.Screen
          name='Fiches de poste'
          component={JobList}
          options={{
              tabBarIcon: ({ color, size }) => (<Ionicons name="file-tray-full" color={color} size={size} />)
          }}
      />
      <Tab.Screen
          name='Uploadez votre'
          component={CV}
          options={{
              tabBarIcon: ({ color, size }) => (<Ionicons name="reader" color={color} size={size} />)
          }} />
  </Tab.Navigator>
  )
}