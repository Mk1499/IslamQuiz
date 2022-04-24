import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../src/Screens/Tabs/Home/Home';

const Stack = createStackNavigator();

export default class HomeStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: '#fff'},
          }}
        />
      </Stack.Navigator>
    );
  }
}
