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
    img: {
      width: moderateScale(100),
      height: moderateScale(100),
      borderRadius: moderateScale(50),
      borderWidth: moderateScale(10),
      borderColor: themeColors.lightText,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      alignSelf: 'center',
    },
    btn: {},
    input: {
      marginTop: moderateScale(20),
    },
    msg: {
      textAlign: 'center',
      fontFamily: fonts.med,
      fontSize: moderateScale(15),
      color: themeColors.text,
    },
  });
export default makeStyle;
