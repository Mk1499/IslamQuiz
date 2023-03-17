import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const makeStyle = () =>
  StyleSheet.create({
    container: {},
    content: {
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(20),
    },
    input: {},
    btn: {},
  });

export default makeStyle;
