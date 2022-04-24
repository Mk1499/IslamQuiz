/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';

import {Provider} from 'react-redux';
import store from './app/Redux/store';
import AppNavigation from './app/Routes/Navigator';
import { mainColor } from './app/src/Config/global';

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="light-content" backgroundColor={mainColor} />
        <AppNavigation />
      </Provider>
    </>
  );
};

export default App;
