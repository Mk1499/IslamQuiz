/* eslint-disable prettier/prettier */
import {Platform, StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';
import {getActiveLang} from '../../../translate';

const {colors, width, height, fonts} = Constants;

const makeStyle = (themeColors: any) => {
  return StyleSheet.create({
    container: {
      backgroundColor: themeColors.bg,
    },
    content: {
      minHeight: height,
    },
    upperSec: {
      backgroundColor: colors.bg,
      paddingBottom: 0.1 * height,
      paddingHorizontal: 0.05 * width,
      borderBottomLeftRadius: getActiveLang() === 'ar' ? 0.1 * width : 0,
      borderBottomRightRadius: getActiveLang() === 'en' ? 0.1 * width : 0,
      paddingTop: Platform.OS === 'ios' ? 0.04 * height : 0,
    },
    logo: {
      height: 0.2 * width,
      width: 0.2 * width,
    },
    appNameText: {
      fontFamily: fonts.med,
      fontSize: 18,
      color: '#fff',
    },
    header: {
      marginTop: 0.02 * height,
    },
    row: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    welcomeCont: {},
    textCont: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
    },
    welcomeText: {
      fontFamily: fonts.med,
      fontSize: 18,
      color: '#fff',
    },
    userName: {
      fontFamily: fonts.bold,
      fontSize: 22,
      color: '#fff',
    },
    iconCont: {
      display: 'flex',
      alignItems: 'center',
      paddingVertical: 15,
      justifyContent: 'center',
      backgroundColor: colors.bg,
      width: 0.1 * width,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,

      elevation: 15,
      borderRadius: 10,
    },
    icon: {
      color: '#fff',
      textAlign: 'center',
    },
    iconLeft: {
      alignSelf: 'flex-start',
    },
    optionsListCont: {
      marginTop: -0.07 * height,
    },
    optionsList: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      width,
    },
    catList: {
      paddingHorizontal: 0.05 * width,
    },
    section: {
      marginVertical: 0.02 * height,
    },
    secTitle: {
      color: themeColors.primary,
      fontFamily: fonts.bold,
      fontSize: 24,
      textAlign: 'center',
      borderColor: themeColors.primary,
      borderWidth: 1,
      alignSelf: 'center',
      paddingHorizontal: 0.1 * width,
      marginVertical: 0.02 * height,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
    },
    listCont: {},
    list: {},
  });
};
export default makeStyle;
