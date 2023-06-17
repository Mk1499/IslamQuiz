/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import ThemeColors from '../../../../Models/ThemeColors.model';
import Constants from '../../../../Config/Constants';
import {moderateScale} from 'react-native-size-matters';

const {height, width, styles, fonts} = Constants;

const makeStyle = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.bg,
    },
    content: {},
    upperCont: {
      backgroundColor: themeColors.primary,
      paddingTop: 0.05 * height,
      paddingBottom: 0.1 * height,
      paddingHorizontal: 0.05 * width,
      // borderBottomRightRadius: moderateScale(70),
      borderBottomLeftRadius: moderateScale(80),
    },
    resultCont: {
      // paddingHorizontal: styles.paddingH,
    },
    searchCont: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors.bg,
      paddingHorizontal: 0.02 * width,
      borderRadius: moderateScale(10),
    },
    searchInput: {
      fontSize: 0.025 * height,
      height: 'auto',
      color: themeColors.primary,
      flex: 1,
      borderWidth: 0,
      // width: '100%',
    },
    icon: {
      color: themeColors.primary,
    },
    section: {
      marginVertical: moderateScale(10),
    },
    sectionTitle: {
      marginHorizontal: styles.paddingH,
      marginBottom: moderateScale(10),
      fontFamily: fonts.med,
      fontSize: moderateScale(18),
    },
    searchImg: {
      height: 0.4 * height,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop: 0.05 * height,
    },
    searchMsg: {
      marginTop: 0.02 * height,
      textAlign: 'center',
      fontSize: moderateScale(18),
      opacity: 0.5,
    },
    list: {},
  });
export default makeStyle;
