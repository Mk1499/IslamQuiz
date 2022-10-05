import React from 'react';
import {StatusBar} from 'react-native';
import NavigationService from './src/Routes/NavigationService';

import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from './src/Redux/store';
import MainStack from './src/Routes/Stacks/Main';
import {ThemeProvider} from './src/Theme/ThemeProvider';

const App = () => {
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
};

export default App;
