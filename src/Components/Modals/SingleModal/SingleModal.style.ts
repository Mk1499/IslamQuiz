import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from '../../../Config/Constants';

const {fonts, width, height} = Constants;

const makeStyle = (themeColors: any) =>
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
    },
    title: {
      color: themeColors.primary,
      fontFamily: fonts.bold,
      textAlign: 'center',
      fontSize: 15,
    },
    msg: {
      color: themeColors.text,
      fontFamily: fonts.med,
      textAlign: 'center',
      fontSize: 12,
    },
    image: {
      alignSelf: 'center',
      height: 0.1 * height,
      resizeMode: 'contain',
      marginTop: moderateScale(10),
    },
  });

export default makeStyle;
