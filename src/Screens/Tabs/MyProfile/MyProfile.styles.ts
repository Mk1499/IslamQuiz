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
      marginBottom: moderateScale(11),
    },
    more: {
      color: themeColors.primary,
    },
    list: {
      alignSelf: 'center',
    },
    emptyCont: {
      // minHeight: height,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyMsg: {
      color: themeColors.text,
      fontFamily: fonts.med,
      fontSize: moderateScale(17),
      textAlign: 'center',
    },
    icon: {
      color: '#fff',
    },
    cardCont: {
      marginEnd: moderateScale(5),
    },
    friendsList: {
      alignSelf: 'center',
    },
    loaderCont: {
      marginTop: moderateScale(10),
    },
  });
export default makeStyle;
