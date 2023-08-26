/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import ThemeColors from '../../../Models/ThemeColors.model';
import {getActiveLang} from '../../../translate';
import Constants from '../../../Config/Constants';

const {fonts} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      // backgroundColor: 'red',
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: moderateScale(5),
      paddingHorizontal: moderateScale(10),
      marginBottom: moderateScale(15),
      borderBottomWidth: 0.4,
      borderColor: themeColors.lightText,
      //   width: '100%',
    },
    iconCont: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    icon: {
      width: moderateScale(34),
      height: moderateScale(34),
      marginHorizontal: moderateScale(5),
      borderRadius: moderateScale(17),
      resizeMode: 'cover',
    },
    label: {
      color: themeColors.text,
      fontFamily: fonts.med,
      fontSize: moderateScale(15),
      textAlign: 'right',
    },
    labelActive: {
      color: themeColors.primary,
      fontFamily: fonts.med,
      fontSize: moderateScale(15),
      textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
    },
    arrowCont: {},
    arrow: {
      fontSize: moderateScale(15),
    },
    rank: {
      fontFamily: fonts.bold,
      color: themeColors.primary,
      fontSize: moderateScale(15),
    },
    dataCont: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
      //   backgroundColor: 'red',
      //   width: '70%',
    },
    email: {
      color: themeColors.lightText,
      fontFamily: fonts.med,
    },
    pointsCont: {},
    points: {
      color: themeColors.primary,
      fontFamily: fonts.bold,
      fontSize: moderateScale(16),
      textAlign: 'center',
    },
    pointLabel: {color: themeColors.text, fontFamily: fonts.reg},
    prizeIcon: {
      width: moderateScale(28),
      height: moderateScale(28),
      alignSelf: 'center',
      marginHorizontal: moderateScale(2),
    },
    row: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    subDataCont: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    subTitle: {
      fontFamily: fonts.med,
      color: themeColors.primary,
      fontSize: moderateScale(10),
    },
    value: {
      fontFamily: fonts.med,
      color: themeColors.text,
      fontSize: moderateScale(11),
      marginHorizontal: moderateScale(5),
    },
  });
export default makeStyle;
