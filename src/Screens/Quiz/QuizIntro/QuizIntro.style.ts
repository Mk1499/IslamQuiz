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
      backgroundColor: themeColors.bg,
    },
    // content: {flex: 1},
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
    tabBarCont: {
      backgroundColor: themeColors.primary,
      direction: 'ltr',
    },
    tabBarlabel: {
      fontFamily: fonts.med,
    },
    indecator: {
      backgroundColor: '#fff',
    },
  });

export default makeStyle;
