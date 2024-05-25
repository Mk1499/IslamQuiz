import React from 'react';
import {StatusBar, View, Text, StyleSheet} from 'react-native';
import NavigationService from './src/Routes/NavigationService';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from './src/Redux/store';
import MainStack from './src/Routes/Stacks/Main';
import {ThemeProvider, useTheme} from './src/Theme/ThemeProvider';
import Constants from './src/Config/Constants';
import {NativeBaseProvider} from 'native-base';
import Toast from 'react-native-toast-message';
import NetworkLoggerScreen from './src/Screens/Test/NetworkLogger';
import {googleConfigure} from './src/Services/social-service';
import config from './src/Config/config';
import {moderateScale} from 'react-native-size-matters';
import 'react-native-get-random-values';
import ForceUpdate from './src/Templates/ForceUpdate';
import FireConfig from './src/Templates/FireConfig';
import * as Ably from 'ably';
import {AblyProvider, useChannel, useConnectionStateListener} from 'ably/react';

const {fonts} = Constants;

googleConfigure();

const App = () => {
  const {colors} = useTheme();
  const client = new Ably.Realtime.Promise({
    key: 'xrmlEA.hyaPLg:s9d4k6F6d_tha9cp4zTffCS8etO4Jll8ss5L6c7U-Ks',
  });

  const toastConfing = {
    success: props => (
      <View style={styles.successCont}>
        <Text style={styles.toastText}>{props.text1}</Text>
      </View>
    ),
    /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
    error: props => (
      <View style={styles.errorCont}>
        <Text style={styles.toastText}>{props.text1}</Text>
      </View>
    ),
  };
  return (
    <Provider store={store}>
      <ThemeProvider>
        <StatusBar backgroundColor={colors.primary} />
        <FireConfig>
          <ForceUpdate>
            <AblyProvider client={client}>
              <NavigationContainer
                ref={(navigatorRef: any) => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}>
                <NativeBaseProvider>
                  <MainStack />
                  {config.enableDebug && <NetworkLoggerScreen />}
                </NativeBaseProvider>
              </NavigationContainer>
            </AblyProvider>
          </ForceUpdate>
        </FireConfig>
        <Toast config={toastConfing} />
      </ThemeProvider>
    </Provider>
  );
  // } else {
  //   return null;
  // }
};

const styles = StyleSheet.create({
  errorCont: {
    backgroundColor: '#B00020',
    width: '70%',
    paddingVertical: moderateScale(10),
    borderRadius: 10,
  },
  toastText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: fonts.med,
    textAlign: 'center',
  },
  successCont: {
    backgroundColor: '#5cb85c',
    width: '70%',
    paddingVertical: moderateScale(10),
    borderRadius: 10,
  },
});

export default App;
