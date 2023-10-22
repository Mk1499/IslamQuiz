/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import ThemeColors from '../../Models/ThemeColors.model';
import {getActiveLang} from '../../translate';
import Constants from '../../Config/Constants';

const {fonts} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
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
      flex: 1,
    },
    dataCont: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
      flex: 0.5,
    },
    label: {
      color: themeColors.text,
      fontSize: moderateScale(13),
    },
    labelMsg: {
      color: themeColors.primary,
      fontSize: moderateScale(13),
      fontFamily: fonts.med,
    },
    date: {
      color: themeColors.lightText,
      fontSize: moderateScale(11),
    },
    textCont: {
      marginHorizontal: moderateScale(8),
    },
    img: {
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: moderateScale(20),
    },
    btnsCont: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
      flex: 0.5,
      // backgroundColor: 'red',
    },
    btn: {
      flex: 1,
      marginEnd: moderateScale(10),
      marginVertical: 0,
      height: moderateScale(35),
    },
    btnLabel: {
      fontFamily: fonts.med,
      fontSize: moderateScale(13),
    },
  });
export default makeStyle;
