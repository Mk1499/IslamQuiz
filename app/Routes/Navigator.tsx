import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './Stacks/AuthStack';
import MainTabs from './MainTabs';
import {navigationRef} from './RootNavigation';

const Stack = createStackNavigator();

export default class AppNavigation extends Component {
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
