import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../Screens/Tabs/Home/Home';
import CreateQuiz from '../../Screens/Quiz/CreateQuiz/CreateQuiz';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from '../../translate';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }
          return (
            <Icon name={iconName} as={Ionicons} color={color} size={size} />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: I18n.Screens.home,
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateQuiz}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
