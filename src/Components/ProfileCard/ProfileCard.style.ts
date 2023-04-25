/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../Config/Constants';
import ThemeColors from '../../Models/ThemeColors.model';

const {fonts, colors} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.bg,
      top: -1 * moderateScale(50),
      alignItems: 'center',
      width: '80%',
      alignSelf: 'center',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      paddingVertical: moderateScale(20),
    },
    img: {
      width: moderateScale(100),
      height: moderateScale(100),
      borderRadius: moderateScale(50),
      borderWidth: moderateScale(10),
      borderColor: themeColors.lightText,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    name: {
      color: themeColors.text,
      fontFamily: fonts.med,
      fontSize: 20,
    },
    email: {
      color: themeColors.lightText,
      fontFamily: fonts.reg,
      fontSize: 17,
      marginBottom: moderateScale(3),
    },
    dataCont: {
      flexDirection: 'row',
      width: '90%',
      alignSelf: 'center',
      //   backgroundColor: 'red',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dataItem: {
      //   backgroundColor: colors.main,
      paddingHorizontal: moderateScale(10),
      paddingVertical: moderateScale(5),

      borderRadius: 10,
      borderColor: colors.main,
      borderWidth: 0.4,
    },
    dataItemText: {
      fontFamily: fonts.med,
      fontSize: moderateScale(13),
      color: themeColors.text,
      textAlign: 'center',
    },
    dataItemTextValue: {
      fontFamily: fonts.bold,
      fontSize: moderateScale(14),
      color: themeColors.primary,
      textAlign: 'center',
    },
  });
export default makeStyle;
