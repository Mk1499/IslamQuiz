/* eslint-disable prettier/prettier */
import {Platform, StyleSheet} from 'react-native';
import Constants from '../../Config/Constants';
import ThemeColors from '../../Models/ThemeColors.model';
import {getActiveLang} from '../../translate';

const {colors} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'ios' ? 0.05 * Constants.height : 0,
      backgroundColor: themeColors.primary,
      width: Constants.width,
      paddingHorizontal: 0.03 * Constants.width,
      paddingBottom: 0.04 * Constants.height,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    brandCont: {
      display: 'flex',
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // backgroundColor: 'red',
    },
    otherLang: {
      fontSize: 18,
      color: Constants.colors.white,
      fontFamily: Constants.fonts.med,
    },
    brand: {
      fontSize: 40,
      color: Constants.colors.white,
      fontFamily: Constants.fonts.bold,
    },
    dataCont: {
      marginVertical: 0.01 * Constants.height,
      position: 'relative',
    },
    title: {
      color: Constants.colors.white,
      fontSize: 25,
      // fontWeight: 'bold',
      marginBottom: 0.01 * Constants.height,
      fontFamily: Constants.fonts.bold,
      textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
    },
    row: {
      display: 'flex',
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    text: {
      fontSize: 15,
      marginEnd: 5,
      color: Constants.colors.white,
      fontFamily: Constants.fonts.reg,
    },
    link: {
      color: Constants.colors.white,
      fontFamily: Constants.fonts.bold,
      textDecorationLine: 'underline',
      fontSize: 17,
    },
    firstExtend: {
      height: 30,
      backgroundColor: themeColors.primary,
      width: '95%',
      alignSelf: 'center',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      marginTop: -10,
      zIndex: -1,
      opacity: 0.9,
    },
    secExtent: {
      height: 30,
      backgroundColor: themeColors.primary,
      width: '85%',
      alignSelf: 'center',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      marginTop: -1,
      zIndex: -3,
      opacity: 0.8,
    },
    bgCont: {
      backgroundColor: Constants.colors.bg,
    },
    icon: {
      color: colors.white,
    },
  });

export default makeStyle;
