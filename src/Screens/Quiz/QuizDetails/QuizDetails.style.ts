import {StyleSheet} from 'react-native';
import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';
import {getActiveLang} from '../../../translate';

const {width, height, fonts, colors} = Constants;
const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {},
    upperCont: {
      height: 0.3 * height,
      backgroundColor: themeColors.primary,
      paddingHorizontal: 0.03 * width,
      paddingVertical: 0.02 * height,
    },
    lowerCont: {
      marginTop: -0.15 * height,
    },
    icon: {},
    row: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    questionNumber: {
      fontFamily: fonts.med,
      color: colors.white,
      fontSize: 20,
    },
    exitBtn: {
      alignSelf: 'center',
      backgroundColor: themeColors.lightText,
      paddingHorizontal: 0.05 * width,
      paddingVertical: 0.01 * height,
      marginTop: 0.03 * height,
      borderRadius: 10,
    },
    exitText: {
      fontFamily: fonts.med,
      //   color: themeColors.primary,
      color: themeColors.text,
      fontSize: 15,
    },
  });

export default makeStyle;
