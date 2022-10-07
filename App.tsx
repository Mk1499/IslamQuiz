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

const App = () => {
  const [intialzed, setIntialzed] = useState(false);

  useEffect(() => {
    intializeApp();
  }, []);

  function intializeApp() {
    AsyncStorage.getItem(Keys.userLang).then((lang: string) => {
      console.log('active lang : ', lang);
      setActiveLang(lang || 'en');
      setIntialzed(true);
    });
    // alert('called');
  }
  if (intialzed) {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor={'red'} />
        <NavigationContainer
          ref={(navigatorRef: any) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}>
          <ThemeProvider>
            <MainStack />
          </ThemeProvider>
        </NavigationContainer>
      </Provider>
    );
  } else {
    return null;
  }
};

export default App;
