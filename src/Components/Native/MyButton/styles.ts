/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';

const {height, width, fonts, colors} = Constants;

const makeStyle = () =>
  StyleSheet.create({
    container: {
      marginVertical: 0.03 * height,
      height: 0.08 * height,
      alignSelf: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Constants.colors.bg,
      width: 0.75 * width,
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    label: {
      fontFamily: fonts.bold,
      fontSize: 20,
      color: colors.subText,
    },
  });

export default makeStyle;
