/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import ThemeColors from '../../../Models/ThemeColors.model';
import Constants from '../../../Config/Constants';
import {moderateScale} from 'react-native-size-matters';

const {fonts} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginBottom: moderateScale(10),
    },
    dateCont: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    text: {
      color: themeColors.text,
      fontFamily: fonts.med,
    },
    chooseBtn: {
      width: 40,
    },
  });
export default makeStyle;
