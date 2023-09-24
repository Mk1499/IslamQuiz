/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import ThemeColors from '../../../Models/ThemeColors.model';
const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.bg,
      flex: 1,
    },
    loaderCont: {},
    listCont: {},
  });
export default makeStyle;
