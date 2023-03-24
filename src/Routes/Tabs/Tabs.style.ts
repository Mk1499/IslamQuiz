import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../Config/Constants';

const {fonts, colors} = Constants;
const makeStyle = (themeColors: any) =>
  StyleSheet.create({
    img: {
      width: moderateScale(20),
    },
    text: {
      color: themeColors.text,
      fontFamily: fonts.med,
      fontSize: moderateScale(10),
    },
    tab: {
      overflow: 'hidden',
      paddingVertical: moderateScale(5),
      backgroundColor: themeColors.bg,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderTopColor: colors.bg,
      borderLeftColor: colors.bg,
      borderRightColor: colors.bg,
    },
  });

export default makeStyle;
