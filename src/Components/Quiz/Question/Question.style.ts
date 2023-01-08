import {StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';

const {colors, width, fonts, height} = Constants;

const makeStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: '#fff',
      marginHorizontal: 0.07 * width,
      paddingHorizontal: 0.07 * width,
      paddingTop: 0.03 * height,
      borderRadius: 20,
    },
    label: {
      color: themeColors.text,
      fontFamily: fonts.bold,
      textAlign: 'center',
      marginBottom: 0.05 * height,
    },
    answerCont: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
      backgroundColor: '#eee',
      marginVertical: 0.01 * height,
      paddingVertical: 0.02 * height,
      paddingHorizontal: 0.02 * width,
      borderRadius: 10,
    },
    answerLabel: {
      color: themeColors.text,
      fontFamily: fonts.med,
    },
    choosedAnswerCont: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
      //   backgroundColor: themeColors.primary,
      backgroundColor: '#333',
      marginVertical: 0.01 * height,
      paddingVertical: 0.02 * height,
      paddingHorizontal: 0.02 * width,
      borderRadius: 10,
    },
    choosedAnswerLabel: {
      color: colors.white,
      fontFamily: fonts.med,
    },
  });

export default makeStyle;
