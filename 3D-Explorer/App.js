import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './screens/Home';
import About from './screens/About';
import Upload from './screens/Upload';
import Terms from './screens/Terms';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './components/Welcome';
import { MaterialIcons } from 'react-native-vector-icons'; // Importing MaterialIcons
import { Text, View } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const isFirstLaunchStored = await AsyncStorage.getItem('isFirstLaunch');
      if (isFirstLaunchStored === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };

    checkFirstLaunch();
  }, []);

  const AppStack = () => (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f0f0f0',
          width: 240,
        },
        headerStyle: {
          backgroundColor: '#6200ee',
        },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="info" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Upload Maps"
        component={Upload}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="upload" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Terms & Conditions"
        component={Terms}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="description" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );

  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    ); // Show loading state until AsyncStorage is checked
  }

  return (
    <NavigationContainer>
      {isFirstLaunch ? (
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={AppStack} options={{ headerShown: false }} />
        </Stack.Navigator>
      ) : (
        <AppStack />
      )}
    </NavigationContainer>
  );
}
