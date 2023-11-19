/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import ThemeColors from '../../../Models/ThemeColors.model';
import Constants from '../../../Config/Constants';
import {moderateScale} from 'react-native-size-matters';

const {styles, fonts} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.bg,
      paddingHorizontal: styles.paddingH,
      height: '100%',
    },
    content: {},
    tipsCont: {
      marginVertical: moderateScale(20),
      //   backgroundColor: themeColors.primary,
      padding: styles.paddingH,
      borderRadius: moderateScale(12),
      borderWidth: moderateScale(1),
      borderColor: themeColors.primary,
    },
    title: {
      textAlign: 'center',
      fontFamily: fonts.bold,
      color: themeColors.primary,
      fontSize: moderateScale(16),
    },
    note: {
      textAlign: 'center',
      fontFamily: fonts.reg,
      fontSize: moderateScale(12),
      marginBottom: moderateScale(12),
      color: themeColors.placeholder,
    },
    tipItemCont: {
      marginVertical: moderateScale(1),
    },
    tipItem: {},
    startBtn: {},
  });
export default makeStyle;
