import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import MovieScreen from './src/screens/MovieScreen'

function App () {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name='home' component={HomeScreen} />
        <Stack.Screen name='movie' component={MovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
