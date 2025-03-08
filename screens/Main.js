import React, { useState } from 'react';
import Home from './Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconIonOct from "react-native-vector-icons/Octicons";
import IconIon from "react-native-vector-icons/SimpleLineIcons";
import About from './About';
import { StatusBar } from 'expo-status-bar';
import SettingsScreen from './Settings';

const Tab = createBottomTabNavigator();

export default Main =  ()=>{
    const [isDarkMode, setisDarkMode] = useState(false)
    return (
        <>
        <StatusBar style='auto' />
        <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: isDarkMode ? "#000" : "#fff",
                height: 55,
                paddingTop:6,
                borderColor: isDarkMode ? "#3C3D37" : "#A6AEBF",
            },
        }}
        >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
              tabBarLabel: "",
              tabBarIcon: ({ color, size }) => (
                  <IconIonOct name="home" size={size} color={color} />
                ),
                tabBarActiveTintColor: "#4C6FFF",
                tabBarInactiveTintColor: !isDarkMode ? "#727D73" : "#F5F5F5",
            }}
            />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
              tabBarLabel: "",
              tabBarIcon: ({ color, size }) => (
                  <IconIon name="settings" size={size} color={color} />
                ),
                tabBarActiveTintColor: "#4C6FFF", 
                tabBarInactiveTintColor: !isDarkMode ? "#727D73" : "#F5F5F5",
            }}
            />
      </Tab.Navigator>
    </>
    )
}