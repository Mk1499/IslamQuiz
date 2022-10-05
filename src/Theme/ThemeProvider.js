/* eslint-disable prettier/prettier */
import React, { createContext, useEffect, useState , useContext } from 'react';
import { DartColors, LightColors } from './colors';
import { useColorScheme } from 'react-native';

export const ThemeContext = createContext({
    dark: false,
    colors: LightColors,
    setScheme: () => { },
});

export const ThemeProvider = props => {
    const colorScheme = useColorScheme();
    const [isDark, setIsDark] = useState(colorScheme === 'dark');

    useEffect(() => {
        setIsDark(colorScheme === 'dark');
    }, [colorScheme])

    const defaultTheme = {
        dark: isDark,
        colors: isDark ? DartColors : LightColors,
        setScheme: (scheme) => { setIsDark(scheme === 'dark') }
    };

    return (
        <ThemeContext.Provider value={defaultTheme}>
            {props.children}
        </ThemeContext.Provider>
    )
};

export const useTheme = () => useContext(ThemeContext)