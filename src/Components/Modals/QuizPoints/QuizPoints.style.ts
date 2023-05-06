import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';
import {getActiveLang} from '../../../translate';

const {fonts, width, height} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {},
    content: {
      backgroundColor: themeColors.bg,
      paddingHorizontal: 0.03 * width,
      paddingVertical: 0.01 * height,
      borderRadius: 10,
      alignContent: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: 0.8 * width,
      alignSelf: 'center',
    },
    title: {
      color: themeColors.primary,
      fontFamily: fonts.bold,
      textAlign: 'center',
      fontSize: moderateScale(15),
    },
    msg: {
      color: themeColors.text,
      fontFamily: fonts.med,
      textAlign: 'center',
      fontSize: moderateScale(13),
    },
    image: {
      alignSelf: 'center',
      height: 0.1 * height,
      resizeMode: 'contain',
      marginTop: moderateScale(10),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btnCont: {
      width: 0.35 * width,
      alignSelf: 'center',
    },
    btnContWide: {
      width: 0.7 * width,
      alignSelf: 'center',
    },
    btnWide: {
      marginTop: 0,
    },
    pointsCont: {
      alignSelf: 'center',
      borderWidth: 1,
      paddingHorizontal: moderateScale(10),
      borderColor: themeColors.primary,
      marginTop: moderateScale(5),
      borderTopRightRadius: moderateScale(10),
      borderBottomLeftRadius: moderateScale(10),
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    points: {
      fontFamily: fonts.bold,
      fontSize: moderateScale(20),
      color: themeColors.primary,
    },
    totalPoints: {
      fontFamily: fonts.bold,
      fontSize: moderateScale(20),
      color: themeColors.text,
    },

    pointsLabel: {
      fontFamily: fonts.med,
      fontSize: moderateScale(17),
      color: themeColors.primary,
      textAlign: 'center',
    },
    logoImg: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      resizeMode: 'contain',
      opacity: 0.07,
    },
  });

export default makeStyle;
