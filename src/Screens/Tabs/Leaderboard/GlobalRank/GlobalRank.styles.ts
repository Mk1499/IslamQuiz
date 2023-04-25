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
      //   alignItems: 'center',
      // justifyContent: 'center',
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
    msgCont: {
      margin: moderateScale(15),
      borderWidth: 1,
      borderColor: themeColors.primary,
      padding: moderateScale(10),
      borderTopRightRadius: moderateScale(15),
      borderBottomLeftRadius: moderateScale(15),
    },
    msg: {
      color: themeColors.text,
      fontFamily: fonts.med,
      fontSize: moderateScale(13),
      textAlign: 'center',
    },
    timer: {
      marginTop: moderateScale(10),
    },
    digitText: {
      color: themeColors.text,
      fontFamily: fonts.reg,
      fontSize: moderateScale(10),
    },
    labelStyle: {
      color: themeColors.text,
      fontFamily: fonts.reg,
      fontSize: moderateScale(10),
    },
  });
export default makeStyle;
