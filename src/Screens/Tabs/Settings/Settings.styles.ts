/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';

const {height} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.bg,
    },
    content: {
      minHeight: height,
    },
    optionsCont: {
      // paddingBottom: moderateScale(20),
      backgroundColor: themeColors.bg,
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
      paddingTop: moderateScale(20),
      width: '90%',
    },
    list: {
      top: -1 * moderateScale(50),
    },
  });
export default makeStyle;
