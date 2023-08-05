import {StyleSheet} from 'react-native';
import Constants from '../../Config/Constants';
import {moderateScale} from 'react-native-size-matters';

const {fonts} = Constants;

const makeStyle = (themeColor: any) =>
  StyleSheet.create({
    container: {
      height: moderateScale(200),
      alignItems: 'center',
      justifyContent: 'center',
    },
    msg: {
      color: themeColor.text,
      fontFamily: fonts.med,
      fontSize: moderateScale(15),
    },
  });

export default makeStyle;
