import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../Screens/Tabs/Home/Home';
// import {Icon} from 'native-base';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from '../../translate';
import {useTheme} from '../../Theme/ThemeProvider';
import {Image, Text} from 'react-native';
import makeStyle from './Tabs.style';
import Profile from '../../Screens/Tabs/Profile/Profile';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  function defineIconImg(routeName: string, focused: boolean) {
    let img;
    let imgActive;
    let image;
    switch (routeName) {
      case 'Home':
        img = require('../../../assets/images/icons/Tabs/home.png');
        imgActive = require('../../../assets/images/icons/Tabs/homeActive.png');
        image = focused ? imgActive : img;
        return image;

      case 'Profile':
        img = require('../../../assets/images/icons/Tabs/profile.png');
        imgActive = require('../../../assets/images/icons/Tabs/profileActive.png');
        image = focused ? imgActive : img;
        return image;
    }
  }

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
        tabBarIcon: ({focused}) => {
          return (
            // <Icon name={iconName} as={Ionicons} color={color} size={size}  />
            <Image
              source={defineIconImg(route.name, focused)}
              style={styles.img}
              resizeMode="contain"
            />
          );
        },
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
      initialRouteName="Profile">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: I18n.Screens.home,
          headerTitleStyle: {
            fontFamily: 'Cairo',
            color: 'red',
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
