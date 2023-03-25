/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';

const {height, fonts} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      minHeight: height,
      backgroundColor: themeColors.bg,
    },
    content: {
      paddingVertical: moderateScale(20),
      paddingHorizontal: moderateScale(10),
    },
    msg: {
      textAlign: 'center',
      fontFamily: fonts.med,
      fontSize: moderateScale(15),
      color: themeColors.text,
    },
    textArea: {},
    btnCont: {},
    btn: {},
  });
export default makeStyle;
