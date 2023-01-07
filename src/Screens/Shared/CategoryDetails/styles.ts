import {StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';

const {width, height, fonts} = Constants;

const makeStyle = (themeColors: any) =>
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
    secTitle: {
      color: themeColors.primary,
      fontFamily: fonts.bold,
      fontSize: 24,
      textAlign: 'center',
      borderColor: themeColors.primary,
      borderWidth: 1,
      alignSelf: 'center',
      paddingHorizontal: 0.1 * width,
      marginVertical: 0.02 * height,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
    },
  });

export default makeStyle;
