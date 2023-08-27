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
      paddingTop: moderateScale(20),
    },
    emptyCont: {
      alignItems: 'center',
    },
    emptyMsg: {
      marginVertical: moderateScale(30),
      fontSize: moderateScale(20),
      fontFamily: fonts.med,
      color: themeColors.primary,
    },
    emptyImg: {
      width: moderateScale(200),
      height: moderateScale(200),
      resizeMode: 'contain',
    },
    listCont: {
      height: 0.82 * height,
      // flexGrow: 1,
    },
  });
export default makeStyle;
