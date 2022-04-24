import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../src/Screens/Auth/Login/Login';

const Stack = createStackNavigator();

export default class AuthStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }
}
