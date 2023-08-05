/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';

const {height, fonts, width} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      minHeight: height,
      backgroundColor: themeColors.bg,
      alignItems: 'center',
      //   justifyContent: 'center',
      paddingTop: moderateScale(10),
      paddingHorizontal: moderateScale(10),
    },
    msg: {
      color: themeColors.text,
      fontSize: moderateScale(15),
      fontFamily: fonts.med,
      textAlign: 'center',
    },
    img: {
      maxHeight: 0.5 * height,
      maxWidth: width,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
  });
export default makeStyle;
