import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../Screens/Tabs/Home/Home';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import I18n from '../../translate';
import {useTheme} from '../../Theme/ThemeProvider';
import {Text} from 'react-native';
import makeStyle from './Tabs.style';
import Profile from '../../Screens/Tabs/Profile/Profile';

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
                  color: focused ? colors.primary : colors.text,
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
              color={focused ? colors.primary : colors.text}
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
              color={focused ? colors.primary : colors.text}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
