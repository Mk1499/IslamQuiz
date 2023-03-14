import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import NavigationService from './src/Routes/NavigationService';
import {setActiveLang} from './src/translate';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from './src/Redux/store';
import MainStack from './src/Routes/Stacks/Main';
import {ThemeProvider} from './src/Theme/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Keys from './src/Config/StorageKeys';
import Constants from './src/Config/Constants';
import {NativeBaseProvider} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
// import messaging from '@react-native-firebase/messaging';
import {
  configureAndroidPushNote,
  requestUserPermission,
} from './src/Services/firebase-service';

import {googleConfigure} from './src/Services/social-service';

googleConfigure();

const App = () => {
  const [intialzed, setIntialzed] = useState(false);

  useEffect(() => {
    intializeApp();
  }, []);

  function intializeApp() {
    requestUserPermission();
    configureAndroidPushNote();

    AsyncStorage.getItem(Keys.userLang)
      .then((lang: string) => {
        console.log('active lang : ', lang);
        setActiveLang(lang || 'ar');
        SplashScreen.hide();
      })
      .then(() => {
        setIntialzed(true);
      });
    // alert('called');
  }
  if (intialzed) {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor={Constants.colors.main} />
        <NavigationContainer
          ref={(navigatorRef: any) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}>
          <ThemeProvider>
            <NativeBaseProvider>
              <MainStack />
              <Toast />
            </NativeBaseProvider>
          </ThemeProvider>
        </NavigationContainer>
      </Provider>
    );
  } else {
    return null;
  }
};

export default App;
