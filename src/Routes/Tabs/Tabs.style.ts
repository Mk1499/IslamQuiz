import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../Config/Constants';
import ThemeColors from '../../Models/ThemeColors.model';

const {fonts} = Constants;
const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    img: {
      width: moderateScale(20),
    },
    text: {
      // color: themeColors.text,
      color: '#fff',
      fontFamily: fonts.med,
      fontSize: moderateScale(10),
    },
    tab: {
      overflow: 'hidden',
      paddingVertical: moderateScale(5),
      backgroundColor: themeColors.primary,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      borderTopWidth: 1,
      borderColor: themeColors.primary,
    },
  });

export default makeStyle;
