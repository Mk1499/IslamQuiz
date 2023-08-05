/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';
import {getActiveLang} from '../../../translate';

const {fonts, height} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {},
    emptyCont: {
      height: 0.5 * height,
      justifyContent: 'center',
    },
    emptyMsg: {
      color: themeColors.text,
      fontFamily: fonts.med,
      fontSize: moderateScale(15),
      textAlign: 'center',
    },
    rankCont: {
      flexDirection: getActiveLang() === 'en' ? 'row' : 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: moderateScale(5),
      borderBottomWidth: 0.3,
      paddingBottom: moderateScale(4),
      marginHorizontal: moderateScale(6),
      borderBottomColor: themeColors.lightText,
    },
    img: {
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: moderateScale(5),
    },
    name: {
      marginHorizontal: moderateScale(5),
      fontFamily: fonts.med,
      color: themeColors.text,
      textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
      fontSize: moderateScale(13),
    },
    time: {
      marginHorizontal: moderateScale(5),
      fontFamily: fonts.bold,
      color: themeColors.primary,
      textAlign: 'right',
      fontSize: moderateScale(11),
    },
    dataCont: {
      flexDirection: getActiveLang() === 'en' ? 'row' : 'row-reverse',
      alignItems: 'center',
    },
    pointsCont: {
      marginHorizontal: moderateScale(10),
    },
    points: {
      color: themeColors.primary,
      fontFamily: fonts.bold,
      fontSize: moderateScale(13),
      textAlign: 'center',
    },
    pointsLabel: {
      color: themeColors.text,
      textAlign: 'center',
      fontFamily: fonts.med,
      fontSize: moderateScale(13),
    },
  });
export default makeStyle;
