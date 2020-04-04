import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../ui/Home'
import RepoUser from '../ui/RepoUser'
import RepoDetails from '../ui/RepoDetails'
import ListFollow from '../ui/ListFollow'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Início" component={Home} />
        <Stack.Screen name="Repositórios" component={RepoUser} />
        <Stack.Screen name="Detalhes" component={RepoDetails} />
        <Stack.Screen name="Seguidores" component={ListFollow} />
        <Stack.Screen name="Seguindo" component={ListFollow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default (App)