/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import ThemeColors from '../../../Models/ThemeColors.model';
import Constants from '../../../Config/Constants';

const {fonts} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    content: {
      backgroundColor: themeColors.bg,
    },
    tabBarCont: {
      backgroundColor: themeColors.primary,
      direction: 'ltr',
    },
    label: {
      fontFamily: fonts.med,
    },
    indecator: {
      backgroundColor: themeColors.text,
    },
  });
export default makeStyle;
