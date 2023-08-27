import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';
import {getActiveLang} from '../../../translate';

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
    secTitleCont: {
      borderColor: themeColors.primary,
      borderWidth: 1,
      alignSelf: 'center',
      paddingHorizontal: 0.1 * width,
      marginVertical: 0.02 * height,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
    },
    secTitle: {
      color: themeColors.primary,
      fontFamily: fonts.bold,
      fontSize: 24,
      textAlign: 'center',
    },
    switchCont: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
      alignSelf: getActiveLang() === 'ar' ? 'flex-end' : 'flex-start',
      paddingHorizontal: moderateScale(20),
      marginVertical: moderateScale(5),
    },
    switchLabel: {
      color: themeColors.primary,
      fontFamily: fonts.med,
      fontSize: moderateScale(15),
      marginHorizontal: moderateScale(10),
    },
  });

export default makeStyle;
