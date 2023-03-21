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
      paddingVertical: moderateScale(10),
      paddingHorizontal: moderateScale(10),
    },
    icon: {
      color: colors.white,
    },
    text: {
      color: colors.white,
      fontFamily: fonts.bold,
      fontSize: moderateScale(18),
    },
  });

export default makeStyle;
