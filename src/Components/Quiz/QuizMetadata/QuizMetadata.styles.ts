import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import Constants from '../../../Config/Constants';
import ThemeColors from '../../../Models/ThemeColors.model';
import {getActiveLang} from '../../../translate';

const {fonts, width, height} = Constants;
const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      //   minHeight: height,
      backgroundColor: themeColors.bg,
      display: 'flex',
    },
    content: {flex: 1},
    metaDateCont: {
      paddingHorizontal: 0.03 * width,
      paddingTop: 0.03 * height,
    },
    row: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      borderColor: '#ddd',
      borderBottomWidth: 1,
      paddingVertical: moderateScale(7),
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
      fontSize: moderateScale(10),
    },
    labelStyle: {
      color: themeColors.text,
      fontFamily: fonts.reg,
      fontSize: moderateScale(10),
    },
    expireMsg: {
      color: themeColors.primary,
      fontFamily: fonts.med,
      fontSize: 15,
      textAlign: 'center',
    },
    actionCont: {
      marginBottom: moderateScale(15),
    },
    loadingCont: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default makeStyle;
