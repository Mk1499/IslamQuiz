import {StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';

const {colors, width, fonts, height} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
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
      backgroundColor: themeColors.bg,
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
      backgroundColor: themeColors.lightText,
      marginVertical: 0.01 * height,
      paddingVertical: 0.02 * height,
      paddingHorizontal: 0.02 * width,
      borderRadius: 10,
      width: '85%',
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
      backgroundColor: themeColors.primary,
      // backgroundColor: '#333',
      marginVertical: 0.01 * height,
      paddingVertical: 0.02 * height,
      paddingHorizontal: 0.02 * width,
      borderRadius: 10,
      width: '85%',
    },
    choosedAnswerLabel: {
      color: colors.white,
      fontFamily: fonts.med,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    icon: {
      backgroundColor: themeColors.primary,
      height: 30,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginEnd: 5,
      borderRadius: 10,
    },
    delIcon: {
      backgroundColor: '#db2828',
    },
    ansInput: {
      width: '85%',
    },
    pointsInput: {
      marginBottom: 10,
    },
  });

export default makeStyle;
