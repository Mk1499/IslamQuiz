/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';

const {height} = Constants;

const makeStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.bg,
    },
    content: {
      height,
    },
  });
export default makeStyle;
