/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';
import {getActiveLang} from '../../../translate';
import {moderateScale} from 'react-native-size-matters';

const {colors, fonts, width, height} = Constants;

const makeStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {
      marginVertical: 0.005 * Constants.height,
    },
    label: {
      color: colors.main,
      fontFamily: fonts.med,
      fontSize: moderateScale(15),
      marginBottom: 0.008 * height,
      textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
    },
    input: {
      fontFamily: fonts.reg,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.main,
      paddingHorizontal: 0.03 * width,
      fontSize: moderateScale(13),
      height: 0.06 * height,
      color: themeColors.text,
      textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
      backgroundColor: themeColors.inputBG,
    },
    icon: {
      position: 'absolute',
      left: getActiveLang() === 'ar' ? 10 : undefined,
      right: getActiveLang() === 'en' ? 10 : undefined,
    },
    inputCont: {
      justifyContent: 'center',
    },
  });

export default makeStyle;
