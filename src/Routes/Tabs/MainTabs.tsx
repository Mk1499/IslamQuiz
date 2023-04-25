import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../Screens/Tabs/Home/Home';
import {Icon} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import I18n from '../../translate';
import {useTheme} from '../../Theme/ThemeProvider';
import {Text} from 'react-native';
import makeStyle from './Tabs.style';
import Profile from '../../Screens/Tabs/Profile/Profile';
// import TakenQuizzes from '../../Screens/History/TakenQuizzes/TakenQuizzes';
import {History} from '../../Screens/Tabs/History/History';
import Leaderboard from '../../Screens/Tabs/Leaderboard/Leaderboard';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  function defineTabName(routeName: string) {
    switch (routeName) {
      case 'Home':
        return I18n.Screens.home;
      case 'Profile':
        return I18n.Screens.profile;
      case 'History':
        return I18n.Screens.history;
      case 'Leaderboard':
        return I18n.Screens.leaderboard;
    }
  }

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[
                styles.text,
                {
                  // color: focused ? colors.primary : '#333',
                  color: !focused ? '#333' : '#fff',
                },
              ]}>
              {defineTabName(route.name)}
            </Text>
          );
        },
        tabBarStyle: styles.tab,
      })}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: I18n.Screens.home,
          headerTitleStyle: {
            fontFamily: 'Cairo',
          },
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              size="lg"
              as={AntDesign}
              color={!focused ? '#333' : '#fff'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Icon
              name="leaderboard"
              size="lg"
              as={MaterialIcons}
              // color={focused ? colors.primary : '#333'}
              color={!focused ? '#333' : '#fff'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Icon
              name="history"
              size="lg"
              as={Octicons}
              // color={focused ? colors.primary : '#333'}
              color={!focused ? '#333' : '#fff'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Icon
              name="profile"
              size="lg"
              as={AntDesign}
              // color={focused ? colors.primary : '#333'}
              color={!focused ? '#333' : '#fff'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
