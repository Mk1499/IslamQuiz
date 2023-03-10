/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../Config/Constants';

const {width, height, colors, fonts} = Constants;

const makeStyle = () =>
  StyleSheet.create({
    container: {
      width: 0.9 * width,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      borderBottomLeftRadius: 20,
      borderTopRightRadius: 20,

      marginVertical: 10,
      overflow: 'hidden',
    },
    cover: {
      width: '100%',
      minHeight: 0.28 * height,
      borderTopRightRadius: 20,
    },
    name: {
      color: colors.white,
      fontFamily: fonts.bold,
      fontSize: moderateScale(18),
      paddingStart: 10,
    },
    desc: {
      color: colors.white,
      fontFamily: fonts.reg,
      fontSize: moderateScale(14),
      paddingStart: 10,
    },

    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      flexDirection: 'column-reverse',
      paddingBottom: 0.02 * height,
    },
  });

export default makeStyle;
