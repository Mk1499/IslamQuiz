/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';

const {height, fonts, colors} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginVertical: 0.03 * height,
      height: moderateScale(40),
      alignSelf: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    label: {
      fontFamily: fonts.bold,
      fontSize: moderateScale(15),
      color: colors.subText,
    },
    emptyLabel: {
      // color: Constants.colors.bg,
      color: themeColors.primary,
      fontFamily: fonts.bold,
      fontSize: moderateScale(15),
    },
    filledCont: {
      elevation: 5,
      // backgroundColor: Constants.colors.bg,
      backgroundColor: themeColors.primary,
    },
    emptyCont: {
      backgroundColor: 'transparent',
      // borderColor: Constants.colors.bg,
      borderColor: themeColors.primary,
      borderWidth: 1,
    },
  });

export default makeStyle;
