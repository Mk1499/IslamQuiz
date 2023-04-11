import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';
import {getActiveLang} from '../../../translate';

const {fonts, width, height} = Constants;
const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      minHeight: height,
    },
    content: {flex: 1},
    metaDateCont: {
      paddingHorizontal: 0.03 * width,
      paddingVertical: 0.03 * height,
    },
    row: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      borderColor: '#ddd',
      borderBottomWidth: 1,
      paddingVertical: 0.02 * height,
    },
    label: {
      color: themeColors.primary,
      fontFamily: fonts.bold,
      fontSize: 15,
    },
    value: {
      color: themeColors.text,
      fontFamily: fonts.med,
      fontSize: 15,
    },
    timer: {
      marginBottom: moderateScale(30),
    },
    digitText: {
      color: themeColors.text,
      fontFamily: fonts.reg,
      fontSize: moderateScale(7),
    },
  });

export default makeStyle;
