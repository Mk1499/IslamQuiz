import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../src/Screens/Tabs/Home/Home';
import History from '../../src/Screens/Tabs/History/History';

const Stack = createStackNavigator();

export default class HistoryStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="History"
          component={History}
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: '#fff'},
          }}
        />
      </Stack.Navigator>
    );
  }
}
