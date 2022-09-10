import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Linking} from 'react-native';
import Login from '../../Screens/Auth/Login/Login';
import navigation from '../NavigationService';

const Stack = createStackNavigator();

export default class MainStack extends Component {
  componentDidMount() {
    this.setupLinking();
    this.linkingListener();
  }

  setupLinking = () => {
    Linking.getInitialURL().then(url => {
      try {
        this.navigateHandler(url);
      } catch (err) {
        console.error('ERR : ', err);
      }
    });
  };

  linkingListener = () => {
    Linking.addEventListener('url', ({url}) => {
      this.navigateHandler(url);
    });
  };

  navigateHandler = async (url: string) => {
    console.log('URL : ', url);
    if (url) {
      let {navigate} = navigation;
      let base = 'https://bo0ky.netlify.app/app-';
      let route = url.replace(base, '');
      console.log('route : ', route);
      let routeArr = route.split('-');
      let stack = routeArr[0];
      let screen = routeArr[1];
      let keyName = routeArr[2];
      let id = routeArr[3];
      let props = {};
      props[keyName] = id;
      console.log('Data : ', routeArr, screen, id);
      console.log('Route : ', screen, props);
      if (stack === 'Main') {
        navigate(screen, props);
      } else {
        navigate(stack, {
          screen,
          params: props,
        });
      }
    }
  };

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }

  componentWillUnmount() {
    Linking.removeAllListeners();
  }
}
