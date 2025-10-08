import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ConferenceListScreen from './screens/ConferenceListScreen';
import ConferenceDetailScreen from './screens/ConferenceDetailScreen';
import MapScreen from './screens/MapScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen name="Lista" component={ConferenceListScreen} options={{ title: 'Conferencias Cervezas' }} />
        <Stack.Screen name="Detalle" component={ConferenceDetailScreen} options={{ title: 'Detalle de Conferencia' }} />
        <Stack.Screen name="Mapa" component={MapScreen} options={{ title: 'Mapa del Evento' }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}