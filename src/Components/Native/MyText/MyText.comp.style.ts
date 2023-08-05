/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';
import {getActiveLang} from '../../../translate';

const {fonts} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    text: {
      color: themeColors.text,
      fontFamily: fonts.reg,
      textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
    },
  });
export default makeStyle;
