/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';
import {getActiveLang} from '../../../translate';

const {height, styles, fonts} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.bg,
    },
    content: {
      minHeight: height,
      backgroundColor: themeColors.bg,
    },
    dataContent: {
      paddingHorizontal: styles.paddingH,
      marginTop: moderateScale(10),
    },
    section: {
      marginBottom: moderateScale(10),
    },
    row: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sectionTitle: {
      fontFamily: fonts.bold,
      fontSize: moderateScale(16),
      color: themeColors.text,
    },
    more: {
      color: themeColors.primary,
      fontFamily: fonts.bold,
    },
    list: {
      alignSelf: 'center',
      marginHorizontal: -1 * styles.paddingH,
      paddingHorizontal: styles.paddingH,
    },
    emptyCont: {
      // minHeight: height,
      justifyContent: 'center',
    },
    emptyMsg: {
      color: themeColors.text,
      fontFamily: fonts.med,
      fontSize: moderateScale(17),
    },
    icon: {
      color: '#fff',
    },
    cardCont: {
      marginEnd: moderateScale(5),
    },
    competitorFrom: {
      marginVertical: moderateScale(9),
      textAlign: 'center',
    },
    date: {
      fontFamily: fonts.med,
      color: themeColors.primary,
    },
    lockedCont: {
      marginVertical: moderateScale(10),
      alignItems: 'center',
    },
    lockedImg: {
      resizeMode: 'contain',
      height: 0.22 * height,
    },
    lockedMsg: {
      marginVertical: moderateScale(10),
      fontSize: moderateScale(15),
    },
  });
export default makeStyle;
