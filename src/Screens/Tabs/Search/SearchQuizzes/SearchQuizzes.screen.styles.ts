/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import ThemeColors from '../../../../Models/ThemeColors.model';
import Constants from '../../../../Config/Constants';

const {styles} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.bg,
    },
    content: {
      paddingHorizontal: styles.paddingH,
    },
    title: {
      marginVertical: moderateScale(10),
    },
    query: {
      color: themeColors.primary,
    },
    list: {},
  });
export default makeStyle;
