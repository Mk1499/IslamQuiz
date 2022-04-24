import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeBaseProvider, Icon} from 'native-base';
import {height, inActiveColor, mainColor} from '../src/Config/global';
import HomeStack from './Stacks/HomeStack';
import IconFonts from '../src/Config/IconFonts';
import HistoryStack from './Stacks/HistoryStack';

const Tab = createBottomTabNavigator();

export default class MainTabs extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: inActiveColor,
          tabBarStyle: {
            backgroundColor: mainColor,
          },
          tabBarHideOnKeyboard: true,
        }}
        initialRouteName="HomeTab"
        tabBarHideOnKeyboard="true">
        <Tab.Screen
          component={HomeStack}
          name="HomeTab"
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color}) => (
              <View style={styles.tabBarCont}>
                <NativeBaseProvider>
                  <Icon
                    name="home"
                    as={IconFonts.Entypo}
                    size="lg"
                    style={styles.icon}
                    color={color}
                  />
                </NativeBaseProvider>
              </View>
            ),
          }}
        />

        <Tab.Screen
          component={HistoryStack}
          name="HistoryTab"
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color}) => (
              <View style={styles.tabBarCont}>
                <NativeBaseProvider>
                  <Icon
                    name="history"
                    as={IconFonts.Octicons}
                    size="lg"
                    style={styles.icon}
                    color={color}
                  />
                </NativeBaseProvider>
              </View>
            ),
            title: 'History',
            tabBarLabelStyle: {
              fontFamily: 'Cairo',
            },
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  tabBarCont: {
    paddingTop: '7%',
    // backgroundColor:'red',
    // flexDirection:'column',
    // alignItems:'center',
    // justifyContent:'center'
  },
  icon: {
    // backgroundColor:'blue'
  },
});
