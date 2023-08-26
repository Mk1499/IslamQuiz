/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.bg,
    },
    formCont: {
      paddingVertical: 0.03 * Constants.height,
      paddingHorizontal: 0.05 * Constants.width,
    },
  });

export default makeStyle;
