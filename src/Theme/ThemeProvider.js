/* eslint-disable prettier/prettier */
import React, {createContext, useEffect, useState, useContext} from 'react';
import {DartColors, LightColors} from './colors';
import {useColorScheme, I18nManager, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageKeys from '../Config/StorageKeys';

export const ThemeContext = createContext({
  dark: false,
  rtl: false,
  colors: LightColors,
  setScheme: () => {},
  setLangUpdated: () => {},
  setRTL: () => {},
});

export const ThemeProvider = props => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  const [isUpdated, setIsUpdated] = useState(false);
  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);

  useEffect(() => {
    const checkRTLStatus = async () => {
      const val = await AsyncStorage.getItem(StorageKeys.userLang);
      if (val !== undefined && val !== null) {
        // alert(val);
        if (val === 'ar') {
          setIsRTL(true);
        } else {
          setIsRTL(false);
        }
      }
    };
    checkRTLStatus();
  }, []);

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const defaultTheme = {
    dark: isDark,
    // dark: false,
    rtl: isRTL,
    colors: isDark ? DartColors : LightColors,
    // colors: LightColors,
    setScheme: scheme => {
      setIsDark(scheme === 'dark');
    },
    setLangUpdated: () => {
      setIsUpdated(!isUpdated);
    },
    setRTL: state => {
      setIsRTL(state);
    },
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
