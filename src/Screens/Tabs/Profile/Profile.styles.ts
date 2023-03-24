/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../../Config/Constants';

const {height} = Constants;

const makeStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.bg,
    },
    content: {
      minHeight: height,
    },
    optionsCont: {
      paddingBottom: moderateScale(20),
    },
  });
export default makeStyle;
