import {StyleSheet} from 'react-native';
import ThemeColors from '../../../../Models/ThemeColors.model';
import Constants from '../../../../Config/Constants';
import {moderateScale} from 'react-native-size-matters';

const {width, height, fonts} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {},
    coverBGImg: {
      width,
      height: 0.35 * height,
    },
    coverBGCont: {},

    buttonText: {
      fontSize: 18,
      fontFamily: 'Cairo',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
    quizzesCont: {
      alignItems: 'center',
    },
    createOne: {
      color: themeColors.primary,
      fontSize: moderateScale(15),
      fontFamily: fonts.bold,
      textAlign: 'center',
      marginTop: moderateScale(10),
    },
    emptyMsg: {
      fontSize: moderateScale(12),
      fontFamily: fonts.med,
      color: themeColors.text,
      textAlign: 'center',
    },
    msgCont: {
      marginTop: 0.3 * height,
    },
  });

export default makeStyle;
