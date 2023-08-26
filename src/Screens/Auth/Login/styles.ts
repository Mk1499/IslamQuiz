/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';

const {fonts} = Constants;
const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.bg,
      minHeight: '100%',
    },
    formCont: {
      paddingVertical: 0.03 * Constants.height,
      paddingHorizontal: 0.05 * Constants.width,
    },
    text: {
      color: themeColors.primary,
      fontFamily: fonts.bold,
      fontSize: 15,
      marginTop: 8,
    },
  });

export default makeStyle;
