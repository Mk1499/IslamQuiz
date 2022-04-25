import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './Stacks/AuthStack';
import MainTabs from './MainTabs';
import {navigationRef} from './RootNavigation';
import { I18nManager } from 'react-native';

const Stack = createStackNavigator();

export default class AppNavigation extends Component {
  componentDidMount() {
    I18nManager.forceRTL(true);
  }

  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{headerShown: false, cardStyle: {backgroundColor: '#fff'}}}
          />
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{
              headerShown: false,
              cardStyle: {backgroundColor: '#fff'},
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
