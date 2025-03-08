import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from './screens/Main';
import WelcomeScreen from './components/Welcome'

const Stack = createStackNavigator();

const App = ()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name={"Welcome"} component={WelcomeScreen} options={{headerShown:false}} />
        <Stack.Screen name={"Main"} component={Main} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
