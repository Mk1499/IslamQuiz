/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';
import {getActiveLang} from '../../../translate';

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
    cardCont: {
      // backgroundColor: themeColors.bg,
      paddingHorizontal: moderateScale(15),
      paddingVertical: moderateScale(10),
      borderBottomWidth: 1,
      borderColor: themeColors.lightText,
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: moderateScale(10),
    },
    label: {
      color: themeColors.text,
      fontFamily: fonts.med,
      fontSize: moderateScale(15),
    },
    icon: {
      color: themeColors.primary,
    },
  });
export default makeStyle;
