/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import ThemeColors from '../../Models/ThemeColors.model';
import {getActiveLang} from '../../translate';
import Constants from '../../Config/Constants';

const {fonts} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      // backgroundColor: 'red',
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: moderateScale(5),
      paddingHorizontal: moderateScale(10),
      marginBottom: moderateScale(15),
      borderBottomWidth: 0.4,
      borderColor: themeColors.lightText,
    },
    iconCont: {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    icon: {
      width: moderateScale(25),
      height: moderateScale(25),
      marginHorizontal: moderateScale(5),
    },
    label: {
      color: themeColors.text,
      fontFamily: fonts.med,
      fontSize: moderateScale(15),
    },
    arrowCont: {},
    arrow: {
      fontSize: moderateScale(15),
    },
  });
export default makeStyle;
