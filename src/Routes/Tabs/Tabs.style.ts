import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../Config/Constants';

const {fonts} = Constants;
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
  });

export default makeStyle;
