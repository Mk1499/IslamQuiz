import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../Config/Constants';
import {getActiveLang} from '../../translate';

const {width, fonts, colors} = Constants;

const makeStyle = (themeColors: any) =>
  StyleSheet.create({
    container: {
      width,
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: themeColors.primary,
      paddingTop: moderateScale(20),
      paddingBottom: moderateScale(70),
      paddingHorizontal: moderateScale(15),
    },
    icon: {
      color: colors.white,
    },
    text: {
      color: colors.white,
      fontFamily: fonts.bold,
      fontSize: moderateScale(20),
      textAlign: 'center',
      flex: 1,
    },
    img: {
      height: moderateScale(30),
      width: moderateScale(30),
    },
    imgCont: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 15,
    },
    iconCont: {
      minWidth: moderateScale(20),
    },
  });

export default makeStyle;
