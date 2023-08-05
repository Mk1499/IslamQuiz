/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import ThemeColors from '../../../../Models/ThemeColors.model';
import Constants from '../../../../Config/Constants';
import {moderateScale} from 'react-native-size-matters';

const {height, fonts} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.bg,
    },
    content: {
      minHeight: height,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyCont: {
      minHeight: height,
      justifyContent: 'center',
    },
    emptyMsg: {
      color: themeColors.text,
      fontFamily: fonts.med,
      fontSize: moderateScale(17),
    },
  });
export default makeStyle;
