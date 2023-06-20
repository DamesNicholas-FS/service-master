import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/home';
import AddTicket from './pages/AddTicket';
import ViewTicket from './pages/ViewTicket';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddTicket" component={AddTicket} />
        <Stack.Screen name="ViewTicket" component={ViewTicket} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
