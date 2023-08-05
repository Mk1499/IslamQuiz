/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import ThemeColors from '../../Models/ThemeColors.model';
import Constants from '../../Config/Constants';
import {moderateScale} from 'react-native-size-matters';

const {height, width, fonts} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      height: 0.3 * height,
      marginHorizontal: 0.02 * width,
    },
    imgCont: {
      alignItems: 'center',
    },
    img: {
      height: 0.1 * height,
      width: 0.1 * height,
      borderRadius: 0.05 * height,
      borderWidth: moderateScale(5),
      borderColor: themeColors.primary,
    },
    name: {},
    rankLabel: {
      fontFamily: fonts.med,
    },
    rank: {
      color: themeColors.primary,
    },
    dataCont: {
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default makeStyle;
