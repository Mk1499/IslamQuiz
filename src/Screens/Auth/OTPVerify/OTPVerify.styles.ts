import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import Constants from '../../../Config/Constants';

const {colors, fonts, width} = Constants;

const makeStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {},
    row: {
      flexDirection: 'row',
      width,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    content: {
      paddingHorizontal: moderateScale(10),
      paddingVertical: moderateScale(10),
    },
    msg: {
      color: themeColors.text,
      fontFamily: fonts.reg,
      textAlign: 'center',
      fontSize: moderateScale(15),
    },
    bold: {
      color: colors.main,
      fontFamily: fonts.bold,
      textAlign: 'center',
      fontSize: moderateScale(15),
    },
    input: {
      width: '80%',
      alignSelf: 'center',
      color: themeColors.text,
      fontFamily: fonts.reg,
      textAlign: 'center',
      fontSize: moderateScale(15),
    },
    text: {
      color: themeColors.text,
      fontFamily: fonts.reg,
      textAlign: 'center',
      fontSize: moderateScale(15),
    },
    resendMsg: {
      color: themeColors.text,
    },
    timer: {
      marginVertical: moderateScale(10),
    },
    digit: {
      backgroundColor: themeColors.primary,
    },
    digitText: {
      color: '#fff',
    },
    resend: {
      textDecorationLine: 'underline',
      marginTop: moderateScale(4),
      color: themeColors.primary,
      fontFamily: fonts.bold,
    },
    btnCont: {
      marginTop: moderateScale(20),
    },
  });

export default makeStyle;
