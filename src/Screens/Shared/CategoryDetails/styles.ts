import {StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';

const {width, height} = Constants;

const makeStyle = () =>
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
  });

export default makeStyle;
