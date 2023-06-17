import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../Screens/Tabs/Home/Home';
import {Icon} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import I18n, {getActiveLang} from '../../translate';
import {useTheme} from '../../Theme/ThemeProvider';
import {Text} from 'react-native';
import makeStyle from './Tabs.style';
import Settings from '../../Screens/Tabs/Settings/Settings';
// import TakenQuizzes from '../../Screens/History/TakenQuizzes/TakenQuizzes';
import Leaderboard from '../../Screens/Tabs/Leaderboard/Leaderboard';
import MyProfile from '../../Screens/Tabs/MyProfile/MyProfile';
import GeneralSearch from '../../Screens/Tabs/Search/General Search/GeneralSearch.screen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  function defineTabName(routeName: string) {
    switch (routeName) {
      case 'Home':
        return I18n.Screens.home;
      case 'MyProfile':
        return I18n.Screens.profile;
      case 'History':
        return I18n.Screens.history;
      case 'Leaderboard':
        return I18n.Screens.leaderboard;
      case 'Settings':
        return I18n.Screens.setting;
      case 'Search':
        return I18n.Screens.search;
    }
  }

  const tabsArr = [
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
    />,
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
            color={focused ? colors.primary : colors.text}
            // color={!focused ? '#333' : '#fff'}
          />
        ),
      }}
    />,
    <Tab.Screen
      name="MyProfile"
      component={MyProfile}
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <Icon
            name="user"
            size="lg"
            as={AntDesign}
            color={focused ? colors.primary : colors.text}
            // color={!focused ? '#333' : '#fff'}
          />
        ),
      }}
    />,
    <Tab.Screen
      name="Search"
      component={GeneralSearch}
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <Icon
            name="search"
            size="lg"
            as={Octicons}
            color={focused ? colors.primary : colors.text}
            // color={!focused ? '#333' : '#fff'}
          />
        ),
      }}
    />,
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <Icon
            name="setting"
            size="lg"
            as={AntDesign}
            color={focused ? colors.primary : colors.text}
            // color={!focused ? '#333' : '#fff'}
          />
        ),
      }}
    />,
  ];

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[
                styles.text,
                {
                  color: focused ? colors.primary : colors.text,
                  // color: !focused ? '#333' : '#fff',
                },
              ]}>
              {defineTabName(route.name)}
            </Text>
          );
        },
        tabBarStyle: styles.tab,
      })}
      initialRouteName="Home">
      {getActiveLang() === 'ar'
        ? tabsArr.map(t => t).reverse()
        : tabsArr.map(t => t)}
    </Tab.Navigator>
  );
}
